import { useState, useCallback, useEffect } from 'react'
import { NextPage, GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useDispatch } from 'react-redux'
import { setTheme } from '@store/ducks/theme'
import useAuth from '@services/auth'
import dynamic from 'next/dynamic'
import nookies from 'nookies'
import load from '@services/load'
import firebaseAdmin from '@utils/firebaseAdmin'
import firebaseClient from '@utils/firebaseClient'
import firebaseApp from 'firebase/app'
import {
  decodeFromDatabase,
  encodeForDatabase
} from '@utils/databaseCodification'
import Head from 'next/head'
import PageContainer from '@components/PageContainer'
import Header from '@components/users/Header'
import FloatingActionButton from '@components/users/FloatingActionButton'
import { LinkItem } from '@components/users/Link'
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
  const [deleteLinkDatetime, setDeleteLinkDatetime] = useState<string>('')
  const [qrModalUrl, setQrModalUrl] = useState<string>('')
  const [links, setLinks] = useState<LinkItem[] | null>(preLoadedLinks)

  const getLinksFromDatabase = useCallback(
    (user: firebaseApp.database.DataSnapshot) => {
      const hasLinksNode = user.hasChild('links')
      if (hasLinksNode) {
        const links = user.child('links')
        const hasLinksToCurrentFilter = links.hasChild(currentFilter)
        if (hasLinksToCurrentFilter) {
          const getLinks: LinkItem[] = []
          links.child(currentFilter).forEach(link => {
            getLinks.push({
              title: link.val().title,
              url: link.val().url,
              date: link.val().date,
              datetime: link.val().datetime
            })
          })
          setLinks(getLinks)
        } else {
          setLinks(null)
        }
      } else {
        setLinks(null)
      }
    },
    [currentFilter]
  )

  const loadTheme = useCallback(() => {
    const getThemeByCookie = (): string | undefined =>
      nookies.get(undefined).theme
    const loadedTheme = load().loadTheme(getThemeByCookie)
    dispatch(setTheme(loadedTheme))
  }, [dispatch])

  const filterLinks = (link: LinkItem): boolean => {
    const searchInputValueInLowerCase = searchInputValue.toLowerCase()
    const linkTitleInLowerCase = link.title.toLowerCase()
    const linkUrlInLowerCase = link.url.toLowerCase()

    if (
      linkTitleInLowerCase.includes(searchInputValueInLowerCase) ||
      linkUrlInLowerCase.includes(searchInputValueInLowerCase) ||
      link.date.includes(searchInputValue) ||
      link.datetime.includes(searchInputValue)
    ) {
      return true
    }
    return false
  }

  const filteredLinks: LinkItem[] | undefined = links?.filter(filterLinks)

  useEffect(() => {
    loadTheme()

    const databaseRef = firebaseClient
      .database()
      .ref(`users/${auth?.user?.uid}`)
    databaseRef.on('value', getLinksFromDatabase)

    return () => {
      databaseRef.off('value', getLinksFromDatabase)
      setSearchInputValue('')
    }
  }, [loadTheme, auth?.user, getLinksFromDatabase])

  return (
    <PageContainer>
      <Head>
        <title>{decodeFromDatabase(currentFilter)} - Lineker</title>
        <link
          rel="shortcut icon"
          href="../../Lineker.ico"
          type="image/x-icon"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
        deleteLinkDatetime={deleteLinkDatetime}
        setDeleteLinkDatetime={setDeleteLinkDatetime}
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
            setDeleteLinkDatetime={setDeleteLinkDatetime}
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

    const cookies = nookies.get(context)
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token)

    let preLoadedLinks: LinkItem[] | null = []
    await firebaseClient
      .database()
      .ref(`users/${token.uid}`)
      .once('value', user => {
        const hasLinksNode = user.hasChild('links')
        if (hasLinksNode) {
          const links = user.child('links')
          const hasLinksToCurrentFilter = links.hasChild(currentFilter)
          if (hasLinksToCurrentFilter) {
            links.child(currentFilter).forEach(link => {
              preLoadedLinks!.push({
                title: link.val().title,
                url: link.val().url,
                date: link.val().date,
                datetime: link.val().datetime
              })
            })
          } else {
            preLoadedLinks = null
          }
        } else {
          preLoadedLinks = null
        }
      })

    return {
      props: {
        currentFilter,
        preLoadedLinks
      }
    }
  } catch (_) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
}

export default User
