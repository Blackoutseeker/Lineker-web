import { FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { StoreState } from '@store/index'
import { setTheme } from '@store/ducks/theme'
import nookies from 'nookies'
import Image from 'next/image'
import {
  HeaderContainer,
  Button,
  ExpandedContent,
  TitleContent,
  SearchContent,
  SearchIconContent,
  SearchInput,
  SwitchButton,
  SwitchTrack,
  SwitchThumb
} from './styles'
import Title from '@components/Title'
import FilterIcon from '@assets/icons/filter.svg'
import SearchIcon from '@assets/icons/search.svg'
import LogOutIcon from '@assets/icons/logout.svg'
import firebase from '@utils/firebaseClient'

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

  const showDrawer = () => {
    setShowDrawer(true)
  }

  const switchTheme = () => {
    const saveTheme = (theme: boolean) => {
      nookies.set(undefined, 'theme', String(theme))
    }
    const themeToBeSetted = !theme
    dispatch(setTheme(themeToBeSetted, saveTheme))
  }

  const navigateToHomepage = () => {
    router.push('/')
  }

  const signOut = async () => {
    nookies.destroy(undefined, 'theme')
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
      <Button title={'Filters'} onClick={showDrawer} data-cy={'drawer-button'}>
        <Image src={FilterIcon} alt={'Filter'} width={22.5} height={15} />
      </Button>
      <TitleContent>
        <Title size={28} />
      </TitleContent>
      <SearchContent>
        <SearchIconContent>
          <Image src={SearchIcon} alt={'Search'} width={20} height={20} />
        </SearchIconContent>
        <SearchInput
          placeholder={'Search for a title, URL or date'}
          value={searchInputValue}
          onChange={({ target }) => {
            setSearchInputValue(target.value)
          }}
        />
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
      <Button onClick={signOut} title={'Sign Out'} data-cy={'signout-button'}>
        <Image src={LogOutIcon} alt={'User Session'} width={25} height={25} />
      </Button>
    </HeaderContainer>
  )
}

export default Header
