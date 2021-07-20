import { NextPage } from 'next'
import Head from 'next/head'
import { ErrorTitle, TextsContainer, Message } from '@components/404/styles'

const Page404: NextPage = () => {
  return (
    <TextsContainer>
      <Head>
        <title>Page not found</title>
        <link rel="shortcut icon" href="Lineker.ico" type="image/x-icon" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <ErrorTitle>Error 404</ErrorTitle>
      <ErrorTitle>Page not found (Ironic, isn&apos;t it?)</ErrorTitle>
      <Message>No links, no pages!</Message>
    </TextsContainer>
  )
}

export default Page404
