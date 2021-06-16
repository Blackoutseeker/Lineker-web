import { FC } from 'react'
import Head from 'next/head'
import Container from '@components/login/container'
import DesktopStoreContent from '@components/login/desktopStoreContent'
import Form from '@components/login/form'

const Login: FC = () => {
  return (
    <Container>
      <Head>
        <title>Login - Lineker</title>
      </Head>
      <DesktopStoreContent store={'Apple'} qrValue={'Sorry! Coming soon!'} />
      <Form />
      <DesktopStoreContent
        store={'Google'}
        qrValue={'https://github.com/Blackoutseeker/Lineker-mobile'}
      />
    </Container>
  )
}

export default Login
