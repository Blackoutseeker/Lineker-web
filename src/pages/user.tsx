import { useState, useCallback, useEffect } from 'react'
import { NextPage, GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useDispatch } from 'react-redux'
import { setTheme } from '@store/ducks/theme'
import { useAuth } from '@services/authProvider'
import dynamic from 'next/dynamic'
import { parseCookies } from 'nookies'
import load from '@services/load'
import { defaultAuth } from '@utils/firebaseAdmin'
import { databaseLinksListener, getAllLinksFromDatabase } from '@database/link'
import { Pages } from '@utils/constants'
import {
  decodeFromDatabase,
  encodeForDatabase
} from '@utils/databaseCodification'
import Head from 'next/head'
import PageContainer from '@components/PageContainer'
import Header from '@components/users/Header'
import FloatingActionButton from '@components/users/FloatingActionButton'
import LinkItem from '@models/linkItem'
const Drawer = dynamic(() => import('@components/users/Drawer'))
const VoidLink = dynamic(() => import('@components/users/VoidLink'))
const Link = dynamic(() => import('@components/users/Link'))
const DeleteConfirmation = dynamic(
  () => import('@components/users/DeleteConfirmation')
)
const AddLinkModal = dynamic(() => import('@components/users/AddLinkModal'))
const QrModal = dynamic(() => import('@components/users/QrModal'))

interface UserProps {
  currentFilter: string
  preLoadedLinks: LinkItem[] | null
}

const User: NextPage<UserProps> = ({ currentFilter, preLoadedLinks }) => {
  const auth = useAuth()
  const dispatch = useDispatch()
  const [searchInputValue, setSearchInputValue] = useState<string>('')
  const [showDrawer, setShowDrawer] = useState<boolean>(false)
  const [showAddLinkModal, setShowAddLinkModal] = useState<boolean>(false)
  const [linkDatetime, setLinkDatetime] = useState<string>('')
  const [qrModalUrl, setQrModalUrl] = useState<string>('')
  const [linkItems, setLinkItems] = useState<LinkItem[] | null>(preLoadedLinks)
  const linksDatabaseRef = `users/${auth.user?.uid}/links/${currentFilter}`

  const loadTheme = useCallback(() => {
    const getThemeByCookie = (): string | undefined => parseCookies().theme
    const loadedTheme = load().loadTheme(getThemeByCookie)
    dispatch(setTheme(loadedTheme))
  }, [dispatch])

  const filterLinksBySearchInputValue = (linkItem: LinkItem): boolean => {
    const searchInputValueInLowerCase = searchInputValue.toLowerCase()
    const linkTitleInLowerCase = linkItem.title.toLowerCase()
    const linkUrlInLowerCase = linkItem.url.toLowerCase()

    if (
      linkTitleInLowerCase.includes(searchInputValueInLowerCase) ||
      linkUrlInLowerCase.includes(searchInputValueInLowerCase) ||
      linkItem.date.includes(searchInputValue) ||
      linkItem.datetime.includes(searchInputValue)
    ) {
      return true
    }
    return false
  }

  const filteredLinks: LinkItem[] | undefined = linkItems?.filter(
    filterLinksBySearchInputValue
  )

  useEffect(() => {
    loadTheme()
    const linksListener = databaseLinksListener(linksDatabaseRef, setLinkItems)
    linksListener.listen()

    return () => {
      linksListener.unlisten()
      setSearchInputValue('')
    }
  }, [loadTheme, auth?.user, linksDatabaseRef])

  return (
    <PageContainer>
      <Head>
        <title>{decodeFromDatabase(currentFilter)} - Lineker</title>
      </Head>
      <Header
        searchInputValue={searchInputValue}
        setSearchInputValue={setSearchInputValue}
        setShowDrawer={setShowDrawer}
      />
      <FloatingActionButton setShowAddLinkModal={setShowAddLinkModal} />
      <AddLinkModal
        showAddLinkModal={showAddLinkModal}
        setShowAddLinkModal={setShowAddLinkModal}
        currentFilter={currentFilter}
      />
      <Drawer
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
        currentFilter={currentFilter}
      />
      <DeleteConfirmation
        linkDatetime={linkDatetime}
        setLinkDatetime={setLinkDatetime}
        currentFilter={currentFilter}
      />
      {filteredLinks ? (
        filteredLinks.map(link => (
          <Link
            key={link.datetime}
            title={link.title}
            url={link.url}
            date={link.date}
            datetime={link.datetime}
            setDeleteLinkDatetime={setLinkDatetime}
            setQrModalUrl={setQrModalUrl}
          />
        ))
      ) : (
        <VoidLink />
      )}
      <QrModal qrModalUrl={qrModalUrl} setQrModalUrl={setQrModalUrl} />
    </PageContainer>
  )
}

export const getServerSideProps: GetServerSideProps<UserProps> = async (
  context: GetServerSidePropsContext
) => {
  try {
    const queryFilter = context.query?.currentFilter?.toString() ?? 'Default'
    const currentFilter = encodeForDatabase(queryFilter)

    const getTokenFromCookie = () => {
      const token = parseCookies(context).token
      return token
    }
    const tokenLoaded = load().loadToken(getTokenFromCookie)
    const decodedIdToken = await defaultAuth.verifyIdToken(tokenLoaded)
    const uid: string = decodedIdToken.uid

    const preLoadedLinks: LinkItem[] | null = await getAllLinksFromDatabase(
      uid,
      currentFilter
    )

    return {
      props: {
        currentFilter,
        preLoadedLinks
      }
    }
  } catch (_) {
    return {
      redirect: {
        destination: Pages.HOME,
        permanent: false
      }
    }
  }
}

export default User
