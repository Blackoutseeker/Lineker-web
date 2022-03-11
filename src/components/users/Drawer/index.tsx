import { FC, useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import useAuth from '@services/auth'
import {
  BackButton,
  BackContent,
  DrawerContainer,
  ItemContent,
  HeaderTitle,
  DrawerHolder,
  AddFilterInput,
  AddButton,
  FilterContent,
  FilterButton,
  FilterButtonText,
  DeleteFilterButton
} from './styles'
import { HiOutlineArrowLeft, HiPlus } from 'react-icons/hi'
import { IoMdClose } from 'react-icons/io'
import OutsideClickHandler from 'react-outside-click-handler'
import firebase from '@utils/firebaseClient'
import firebaseApp from 'firebase/app'
import {
  encodeForDatabase,
  decodeFromDatabase
} from '@utils/databaseCodification'

interface FilterItem {
  filter: string
}

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

  const hideDrawer = useCallback(() => {
    setShowDrawer(false)
    setAddFilterInputValue('')
  }, [setShowDrawer])

  const getFiltersFromDatabase = (
    filters: firebaseApp.database.DataSnapshot
  ) => {
    const getFilters: FilterItem[] = []
    filters.forEach(filter => {
      getFilters.push({
        filter: filter.val().filter
      })
    })
    setFilters(getFilters)
  }

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
    const isValidFilter = addFilterInputValue !== ''
    if (isValidFilter) {
      const encodedFilter = encodeForDatabase(addFilterInputValue)
      await firebase
        .database()
        .ref(`users/${auth!.user!.uid}/filters/${encodedFilter}`)
        .set({
          filter: encodedFilter
        })
        .then(() => {
          setCurrentFilter(encodedFilter)
        })
    }
  }

  const handleEnterKeyDown = (key: string) => {
    if (key === 'Enter') {
      addNewFilter()
    }
  }

  const deleteFilterAndLinks = useCallback(
    async (filter: string) => {
      await firebase
        .database()
        .ref(`users/${auth!.user!.uid}/filters/${filter}`)
        .remove()
      await firebase
        .database()
        .ref(`users/${auth!.user!.uid}/links/${filter}`)
        .remove()
        .then(() => {
          if (filter === currentFilter) {
            setCurrentFilter('Default')
          }
        })
    },
    [auth, currentFilter, setCurrentFilter]
  )

  useEffect(() => {
    const databaseRef = firebase
      .database()
      .ref(`users/${auth?.user?.uid}/filters`)
    databaseRef.on('value', getFiltersFromDatabase)

    return () => {
      databaseRef.off('value', getFiltersFromDatabase)
    }
  }, [auth?.user?.uid])

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
          {filters.map((item: FilterItem, index: number) => (
            <FilterContent
              className={item.filter === currentFilter ? 'current-filter' : ''}
              key={index}
            >
              <FilterButton
                onClick={() => {
                  setCurrentFilter(item.filter)
                }}
                title={decodeFromDatabase(item.filter)}
              >
                <FilterButtonText>
                  {decodeFromDatabase(item.filter)}
                </FilterButtonText>
              </FilterButton>
              {item.filter !== 'Default' ? (
                <DeleteFilterButton
                  onClick={() => {
                    deleteFilterAndLinks(item.filter)
                  }}
                  title={'Delete Filter'}
                >
                  <IoMdClose color={'#fff'} size={20} />
                </DeleteFilterButton>
              ) : null}
            </FilterContent>
          ))}
        </DrawerContainer>
      </OutsideClickHandler>
    </DrawerHolder>
  )
}

export default Drawer
