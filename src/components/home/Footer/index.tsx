import { FC } from 'react'
import Image from 'next/image'
import { FooterContainer, FooterText, ImageContent } from './styles'
import Google from '@assets/images/Google.png'

const Footer: FC = () => {
  return (
    <FooterContainer>
      <FooterText>© 2021 Felipe Pereira de Souza Silva</FooterText>
      <ImageContent
        href={
          'https://play.google.com/store/apps/details?id=com.FelipsTudio.lineker'
        }
        target={'_blank'}
      >
        <Image src={Google} alt={'Play Store'} width={180.88} height={70} />
      </ImageContent>
    </FooterContainer>
  )
}

export default Footer
