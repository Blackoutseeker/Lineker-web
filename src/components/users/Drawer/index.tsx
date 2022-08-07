import { FC, useEffect, useState, useCallback } from 'react'
import FilterItem from '@models/filterItem'
import { useRouter } from 'next/router'
import { useAuth } from '@services/authProvider'
import {
  BackButton,
  BackContent,
  DrawerContainer,
  ItemContent,
  HeaderTitle,
  DrawerHolder,
  AddFilterInput,
  AddButton,
  Divider,
  FilterButton,
  FilterTextContent,
  FilterText,
  DeleteFilterButton
} from './styles'
import { HiOutlineArrowLeft, HiPlus } from 'react-icons/hi'
import { IoMdClose } from 'react-icons/io'
import OutsideClickHandler from 'react-outside-click-handler'
import {
  addNewFilterIntoDatabase,
  removeFilterFromDatabase,
  databaseFiltersListener
} from '@database/filter'
import {
  encodeForDatabase,
  decodeFromDatabase
} from '@utils/databaseCodification'

interface DrawerProps {
  showDrawer: boolean
  setShowDrawer: (value: boolean) => void
  currentFilter: string
}

const Drawer: FC<DrawerProps> = ({
  showDrawer,
  setShowDrawer,
  currentFilter
}) => {
  const router = useRouter()
  const auth = useAuth()
  const [addFilterInputValue, setAddFilterInputValue] = useState<string>('')
  const [filters, setFilters] = useState<FilterItem[]>([{ filter: 'Default' }])
  const filtersDatabaseRef: string = `users/${auth.user?.uid}/filters`

  const hideDrawer = useCallback(() => {
    setShowDrawer(false)
    setAddFilterInputValue('')
  }, [setShowDrawer])

  const navigateToCurrentFilter = useCallback(
    async (currentFilter: string) => {
      await router
        .push({
          pathname: '/user',
          query: {
            currentFilter
          }
        })
        .then(hideDrawer)
    },
    [router, hideDrawer]
  )

  const setCurrentFilter = useCallback(
    async (filterToBeSetted: string) => {
      if (currentFilter !== filterToBeSetted) {
        navigateToCurrentFilter(filterToBeSetted)
      }
    },
    [currentFilter, navigateToCurrentFilter]
  )

  const addNewFilter = async () => {
    const isValidFilter = addFilterInputValue.length > 0
    const userIsAuthenticated = auth.user !== null
    if (isValidFilter && userIsAuthenticated) {
      const encodedFilter = encodeForDatabase(addFilterInputValue)
      await addNewFilterIntoDatabase(auth.user!.uid, encodedFilter, () =>
        setCurrentFilter(encodedFilter)
      )
    }
  }

  const handleEnterKeyDown = (key: string) => {
    if (key === 'Enter') {
      addNewFilter()
    }
  }

  const setDefaultFilterOnDelete = useCallback(
    (filter: string) => {
      if (filter === currentFilter) {
        setCurrentFilter('Default')
      }
    },
    [currentFilter, setCurrentFilter]
  )

  const deleteFilterAndItsLinks = useCallback(
    async (filter: string) => {
      const userIsAuthenticated = auth.user !== null
      if (userIsAuthenticated) {
        await removeFilterFromDatabase(auth.user!.uid, filter, () =>
          setDefaultFilterOnDelete(filter)
        )
      }
    },
    [auth.user, setDefaultFilterOnDelete]
  )

  useEffect(() => {
    const filtersListener = databaseFiltersListener(
      filtersDatabaseRef,
      setFilters
    )
    filtersListener.listen()

    return () => {
      filtersListener.unlisten()
    }
  }, [filtersDatabaseRef])

  return (
    <DrawerHolder className={`${showDrawer ? 'show' : 'hide'}-drawer-holder`}>
      <OutsideClickHandler onOutsideClick={hideDrawer}>
        <DrawerContainer className={`${showDrawer ? 'show' : 'hide'}-drawer`}>
          <ItemContent>
            <BackContent>
              <BackButton onClick={hideDrawer} title={'Hide Drawer'}>
                <HiOutlineArrowLeft color={'#fff'} size={25} />
              </BackButton>
            </BackContent>
            <HeaderTitle>Filters</HeaderTitle>
          </ItemContent>
          <ItemContent>
            <AddFilterInput
              placeholder={'Add filter'}
              value={addFilterInputValue}
              onChange={({ target }) => {
                setAddFilterInputValue(target.value)
              }}
              onKeyDown={({ key }) => handleEnterKeyDown(key)}
              data-cy={'add-filter-input'}
            />
            <AddButton onClick={addNewFilter} title={'Add Filter'}>
              <HiPlus color={'#fff'} size={20} />
            </AddButton>
          </ItemContent>
          <Divider />
          {filters.map((item: FilterItem) => (
            <FilterButton
              key={item.filter}
              className={item.filter === currentFilter ? 'current-filter' : ''}
              onClick={() => {
                setCurrentFilter(item.filter)
              }}
              title={decodeFromDatabase(item.filter)}
              data-cy={`filter-button-${item.filter}`}
            >
              <FilterTextContent>
                <FilterText>{decodeFromDatabase(item.filter)}</FilterText>
              </FilterTextContent>
              {item.filter !== 'Default' ? (
                <DeleteFilterButton
                  onClick={() => {
                    deleteFilterAndItsLinks(item.filter)
                  }}
                  title={'Delete Filter'}
                  data-cy={`delete-filter-button-${item.filter}`}
                >
                  <IoMdClose color={'#fff'} size={20} />
                </DeleteFilterButton>
              ) : null}
            </FilterButton>
          ))}
        </DrawerContainer>
      </OutsideClickHandler>
    </DrawerHolder>
  )
}

export default Drawer
