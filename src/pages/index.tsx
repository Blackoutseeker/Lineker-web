import { FC } from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import nookies from 'nookies'
import firebaseAdmin from '@utils/firebaseAdmin'
import RedirectText from '@components/redirecting'

const Redirect: FC = () => {
  return (
    <>
      <Head>
        <title>Lineker</title>
      </Head>
      <RedirectText>Redirecting...</RedirectText>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  try {
    const cookie = nookies.get(ctx)
    const token = await firebaseAdmin.auth().verifyIdToken(cookie.token)

    return {
      props: {
        token: token
      },
      redirect: {
        destination: '/user',
        permanent: false
      }
    }
  } catch (_) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }
}

export default Redirect
