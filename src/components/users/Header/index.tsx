import { FC, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { StoreState } from '@store/index'
import { setTheme } from '@store/ducks/theme'
import { setCookie, destroyCookie } from 'nookies'
import {
  HeaderContainer,
  Button,
  ExpandedContent,
  TitleContent,
  SearchContent,
  SearchIconContent,
  SearchInput,
  CleanIconContent,
  CleanButton,
  SwitchButton,
  SwitchTrack,
  SwitchThumb
} from './styles'
import Title from '@components/Title'
import { FaFilter, FaSearch } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'
import { FiLogOut } from 'react-icons/fi'
import { BiHistory } from 'react-icons/bi'
import firebase from '@utils/firebaseClient'
import { Pages } from '@utils/constants'

interface HeaderProps {
  searchInputValue: string
  setSearchInputValue: (value: string) => void
  setShowDrawer: (value: boolean) => void
}

const Header: FC<HeaderProps> = ({
  searchInputValue,
  setSearchInputValue,
  setShowDrawer
}) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const theme = useSelector((state: StoreState) => state.theme)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const showFiltersDrawer = () => {
    setShowDrawer(true)
  }

  const setFocusOnSearchInput = () => {
    searchInputRef.current?.focus()
  }

  const clearSearchInput = () => {
    setSearchInputValue('')
    setFocusOnSearchInput()
  }

  const switchTheme = () => {
    const saveTheme = (theme: boolean) => {
      setCookie(undefined, 'theme', String(theme), {
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30 // 30 days
      })
    }
    const themeToBeSetted = !theme
    dispatch(setTheme(themeToBeSetted, saveTheme))
  }

  const navigateToHistoryPage = () => {
    router.push(Pages.HISTORY)
  }

  const navigateToHomepage = () => {
    router.push(Pages.HOME)
  }

  const signOut = async () => {
    destroyCookie(undefined, 'theme')
    await firebase
      .auth()
      .signOut()
      .then(() => {
        const lightTheme = false
        dispatch(setTheme(lightTheme))
        navigateToHomepage()
      })
  }

  return (
    <HeaderContainer>
      <Button
        title={'Filters'}
        onClick={showFiltersDrawer}
        data-cy={'drawer-button'}
      >
        <FaFilter color={'#fff'} size={20} />
      </Button>
      <TitleContent>
        <Title size={28} />
      </TitleContent>
      <SearchContent>
        <SearchIconContent>
          <FaSearch color={'#fff'} size={20} />
        </SearchIconContent>
        <SearchInput
          ref={searchInputRef}
          placeholder={'Search for a title, URL or date'}
          value={searchInputValue}
          onChange={({ target }) => {
            setSearchInputValue(target.value)
          }}
        />
        <CleanIconContent>
          <CleanButton onClick={clearSearchInput} title={'Clear Search Input'}>
            <IoMdClose color={'#fff'} size={20} />
          </CleanButton>
        </CleanIconContent>
      </SearchContent>
      <ExpandedContent>
        <SwitchButton
          onClick={switchTheme}
          data-cy={'switch-button'}
          title={'Change Theme'}
        >
          <SwitchTrack>
            <SwitchThumb
              className={theme ? 'switch-thumb-right' : 'switch-thumb-left'}
            />
          </SwitchTrack>
        </SwitchButton>
      </ExpandedContent>
      <Button
        onClick={navigateToHistoryPage}
        title={'History'}
        data-cy={'history-button'}
      >
        <BiHistory color={'#fff'} size={30} />
      </Button>
      <Button onClick={signOut} title={'Sign Out'} data-cy={'signout-button'}>
        <FiLogOut color={'#fff'} size={25} />
      </Button>
    </HeaderContainer>
  )
}

export default Header
