import { useEffect, useCallback } from 'react'
import { NextPage, GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { useAuth } from '@services/authProvider'
import { parseCookies } from 'nookies'
import isMobileDevice from '@services/device'
import load from '@services/load'
import { defaultAuth } from '@utils/firebaseAdmin'
import { Pages } from '@utils/constants'
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
  const auth = useAuth()
  const router = useRouter()

  const navigateToUserPage = useCallback(() => {
    router.push(Pages.USER)
  }, [router])

  useEffect(() => {
    const isAuthenicated: boolean = auth.user !== null
    if (isAuthenicated) {
      navigateToUserPage()
    }
  }, [auth, navigateToUserPage])

  return (
    <PageContainer>
      <Head>
        <title>Lineker</title>
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
        href={
          'https://play.google.com/store/apps/details?id=com.FelipsTudio.lineker'
        }
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
    const getTokenFromCookie = (): string | undefined => {
      const token = parseCookies(context).token
      return token
    }
    const tokenLoaded = load().loadToken(getTokenFromCookie)
    await defaultAuth.verifyIdToken(tokenLoaded)
    return {
      redirect: {
        destination: Pages.USER,
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
