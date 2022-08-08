import { useState, useEffect } from 'react'
import { NextPage, GetServerSideProps, GetServerSidePropsContext } from 'next'
import HistoryItem from '@models/historyItem'
import { parseCookies } from 'nookies'
import { databaseHistoryItemsListener } from '@database/history'
import { defaultAuth } from '@utils/firebaseAdmin'
import { Pages } from '@utils/constants'
import { useAuth } from '@services/authProvider'
import { formatDateAndTimeStringToDate } from '@services/formatDate'
import isMobileDevice from '@services/device'
import load from '@services/load'
import Head from 'next/head'
import PageContainer from '@components/PageContainer'
import BackButton from '@components/history/BackButton'
import VoidHistory from '@components/history/VoidHistory'
import HistoryCard from '@components/history/HistoryCard'
import Item from '@components/history/Item'

const History: NextPage = () => {
  const auth = useAuth()
  const [historyItems, setHistoryItems] = useState<HistoryItem[] | null>(null)
  const [search, setSearch] = useState<string>('')
  const historyDatabaseRef = `users/${auth.user?.uid}/history`

  const historyItemsSortedByMostRecentFirst = historyItems?.sort((a, b) => {
    const dateA = formatDateAndTimeStringToDate(a.date, a.time)
    const dateB = formatDateAndTimeStringToDate(b.date, b.time)
    return dateB.getTime() - dateA.getTime()
  })

  const historyItemsFilteredBySearch =
    historyItemsSortedByMostRecentFirst?.filter(historyItem => {
      const searchInLowerCase = search.toLowerCase()
      const titleInLowerCase = historyItem.title.toLowerCase()
      const urlInLowerCase = historyItem.url.toLowerCase()
      const dateInLowerCase = historyItem.date.toLowerCase()
      const timeInLowerCase = historyItem.time.toLowerCase()

      if (
        titleInLowerCase.includes(searchInLowerCase) ||
        urlInLowerCase.includes(searchInLowerCase) ||
        dateInLowerCase.includes(searchInLowerCase) ||
        timeInLowerCase.includes(searchInLowerCase)
      ) {
        return true
      }
      return false
    })

  useEffect(() => {
    const historyListener = databaseHistoryItemsListener(
      historyDatabaseRef,
      setHistoryItems
    )
    historyListener.listen()

    return () => {
      historyListener.unlisten()
    }
  }, [historyDatabaseRef])

  return (
    <PageContainer>
      <Head>
        <title>History - Lineker</title>
      </Head>
      <BackButton />
      {historyItemsFilteredBySearch ? (
        <HistoryCard uid={auth.user?.uid} search={search} setSearch={setSearch}>
          {historyItemsFilteredBySearch.map(historyItem => (
            <Item
              key={historyItem.datetime}
              uid={auth.user?.uid}
              historyItem={historyItem}
            />
          ))}
        </HistoryCard>
      ) : (
        <VoidHistory />
      )}
    </PageContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const getTokenFromCookie = (): string | undefined => {
      const token = parseCookies(context).token
      return token
    }
    const tokenLoaded = load().loadToken(getTokenFromCookie)
    await defaultAuth.verifyIdToken(tokenLoaded)

    return {
      props: {}
    }
  } catch (_) {
    const isMobile = isMobileDevice(context.req.headers['user-agent'])
    return {
      redirect: {
        destination: Pages.HOME,
        permanent: isMobile
      }
    }
  }
}

export default History
