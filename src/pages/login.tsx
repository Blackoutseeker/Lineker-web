import { FC } from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import isMobileDevice from '@services/device'
import nookies from 'nookies'
import firebaseAdmin from '@utils/firebaseAdmin'
import Head from 'next/head'
import Container from '@components/login/Container'
import StoreContent from '@components/login/StoreContent'
import Form from '@components/login/Form'

const Login: FC = () => {
  return (
    <Container>
      <Head>
        <title>Login - Lineker</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <StoreContent store={'App Store'} qrValue={'Sorry! Coming soon!'} />
      <Form />
      <StoreContent
        store={'Play Store'}
        qrValue={'https://github.com/Blackoutseeker/Lineker-mobile'}
      />
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const cookie = nookies.get(context)
    const token = await firebaseAdmin.auth().verifyIdToken(cookie.token)
    return {
      redirect: {
        destination: `/users/${token.uid}?currentFilter=Default`,
        permanent: false
      }
    }
  } catch (_) {
    const isMobile = isMobileDevice(context.req.headers['user-agent'])
    if (isMobile) {
      return {
        redirect: {
          destination: '/',
          permanent: true
        }
      }
    }
    return {
      props: {}
    }
  }
}

export default Login
