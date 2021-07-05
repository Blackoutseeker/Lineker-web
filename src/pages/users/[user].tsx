import { FC } from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import nookies from 'nookies'
import firebaseAdmin from '@utils/firebaseAdmin'
import Head from 'next/head'
import { useRouter } from 'next/router'

const User: FC = () => {
  const router = useRouter()

  return (
    <div>
      <Head>
        <title>{router.query.currentFilter} - Lineker</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <h1>{router.query.currentFilter}</h1>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const cookies = nookies.get(context, 'token')
    await firebaseAdmin.auth().verifyIdToken(cookies.token)
    return {
      props: {}
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
