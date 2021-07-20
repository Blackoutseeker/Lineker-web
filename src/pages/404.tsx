import { NextPage } from 'next'
import { ErrorTitle, TextsContainer, Message } from '@components/404/styles'

const Page404: NextPage = () => {
  return (
    <TextsContainer>
      <ErrorTitle>Error 404</ErrorTitle>
      <ErrorTitle>Page not found (Ironic, isn&apos;t it?)</ErrorTitle>
      <Message>No links, no pages!</Message>
    </TextsContainer>
  )
}

export default Page404
