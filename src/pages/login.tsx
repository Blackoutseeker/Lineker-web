import { NextPage, GetServerSideProps, GetServerSidePropsContext } from 'next'
import isMobileDevice from '@services/device'
import nookies from 'nookies'
import firebaseAdmin from '@utils/firebaseAdmin'
import Head from 'next/head'
import Container from '@components/login/Container'
import StoreContent from '@components/login/StoreContent'
import Form from '@components/login/Form'

const Login: NextPage = () => {
  return (
    <Container>
      <Head>
        <title>Login - Lineker</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <StoreContent
        storeName={'App Store'}
        mobileAppUrl={'Sorry! Coming soon!'}
        sideToBePositioned={'left'}
      />
      <Form />
      <StoreContent
        storeName={'Play Store'}
        mobileAppUrl={'https://github.com/Blackoutseeker/Lineker-mobile'}
        sideToBePositioned={'right'}
      />
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const cookies = nookies.get(context)
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token)
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
