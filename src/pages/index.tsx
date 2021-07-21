import { NextPage, GetServerSideProps, GetServerSidePropsContext } from 'next'
import isMobileDevice from '@services/device'
import nookies from 'nookies'
import firebaseAdmin from '@utils/firebaseAdmin'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import {
  Slogan,
  TitleContent,
  ButtonContent,
  SignInButton,
  SourceCodeButton,
  ButtonText,
  Description,
  ShowOffContainer,
  StoreContent
} from '@components/home/styles'
import PageContainer from '@components/PageContainer'
import Title from '@components/Title'
import LinekerLogo from '@assets/images/Lineker.png'
import Google from '@assets/images/Google.png'
import Section from '@components/home/Section'
import ShowOffDesktop from '@assets/images/Show Off Desktop.png'
import ShowOffMobile from '@assets/images/Show Off Mobile.png'
import ShowOffDesktopDark from '@assets/images/Show Off Desktop Dark.png'
import ShowOffMobileDark from '@assets/images/Show Off Mobile Dark.png'
import Footer from '@components/home/Footer'

interface HomeProps {
  isMobile: boolean
}

const Home: NextPage<HomeProps> = ({ isMobile }) => {
  return (
    <PageContainer>
      <Head>
        <title>Lineker</title>
        <link rel="shortcut icon" href="Lineker.ico" type="image/x-icon" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#003B59" />
        <meta
          name="keywords"
          content="lineker, link, links, url, filters, access, 
          devices, manage, desktop, smartphone"
        />
        <meta
          name="description"
          content="Lineker allows you to manage links between your desktop
          and smartphone in real time, creating and deleting them at any time. You
          can also create filters to organize your links."
        />
      </Head>
      <TitleContent>
        <Title size={40} />
      </TitleContent>
      <Image
        src={LinekerLogo}
        alt={'Lineker Logo'}
        width={300}
        height={300}
        placeholder={'blur'}
      />
      <Slogan>Access links between your devices</Slogan>
      <ButtonContent>
        <Link href={'/login'}>
          <SignInButton>
            <ButtonText>Get Started</ButtonText>
          </SignInButton>
        </Link>
        <SourceCodeButton
          href={'https://github.com/Blackoutseeker/Lineker-web'}
          target={'_blank'}
        >
          <ButtonText>Source Code</ButtonText>
        </SourceCodeButton>
      </ButtonContent>
      <StoreContent
        href={'https://github.com/Blackoutseeker/Lineker-mobile/releases'}
        target={'_blank'}
      >
        <Image src={Google} alt={'Play Store'} width={240} height={92.88} />
      </StoreContent>
      <Description>
        <strong>Lineker</strong> allows you to manage links between your desktop
        and smartphone in real time, creating and deleting them at any time. You
        can also create filters to organize your links.
      </Description>
      <ShowOffContainer>
        <Section
          title={'View your links in real time'}
          imageUrl={isMobile ? ShowOffMobile : ShowOffDesktop}
          imageWidth={isMobile ? 320 : 1144}
          imageHeight={isMobile ? 569 : 643}
        />
        <Section
          title={'Dark theme available'}
          imageUrl={isMobile ? ShowOffMobileDark : ShowOffDesktopDark}
          imageWidth={isMobile ? 320 : 1144}
          imageHeight={isMobile ? 569 : 643}
        />
      </ShowOffContainer>
      <Footer />
    </PageContainer>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  context: GetServerSidePropsContext
) => {
  try {
    const cookies = nookies.get(context)
    await firebaseAdmin.auth().verifyIdToken(cookies.token)
    return {
      redirect: {
        destination: '/user?currentFilter=Default',
        permanent: false
      }
    }
  } catch (_) {
    const isMobile = isMobileDevice(context.req.headers['user-agent'])
    return {
      props: {
        isMobile
      }
    }
  }
}

export default Home
