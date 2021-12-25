import { NextPage, GetServerSideProps, GetServerSidePropsContext } from 'next'
import { parseCookies } from 'nookies'
import isMobileDevice from '@services/device'
import load from '@services/load'
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
        <meta
          name="keywords"
          content="lineker, link, links, url, filters, access, login, signin, account"
        />
        <meta
          name="description"
          content="Login with your account or create one! You can also sign in 
          with your Google account!"
        />
      </Head>
      <StoreContent
        storeName={'App Store'}
        mobileAppUrl={'Sorry! Coming soon!'}
        sideToBePositioned={'left'}
      />
      <Form />
      <StoreContent
        storeName={'Play Store'}
        mobileAppUrl={
          'https://play.google.com/store/apps/details?id=com.FelipsTudio.lineker'
        }
        sideToBePositioned={'right'}
      />
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const getTokenFromCookie = () => {
      const token = parseCookies(context).token
      return token
    }
    const tokenLoaded = load().loadToken(getTokenFromCookie)
    await firebaseAdmin.auth().verifyIdToken(tokenLoaded)
    return {
      redirect: {
        destination: '/user?currentFilter=Default',
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
