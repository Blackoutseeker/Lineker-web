import { FC } from 'react'
import Image from 'next/image'
import { Content, QrContent } from './styles'
import QrCode from 'qrcode.react'
import Apple from '@assets/images/Apple.png'
import Google from '@assets/images/Google.png'

interface StoreContentProps {
  storeName: string
  mobileAppUrl: string
  sideToBePositioned: 'right' | 'left'
}

const StoreContent: FC<StoreContentProps> = props => {
  const { storeName, mobileAppUrl, sideToBePositioned } = props

  return (
    <Content side={sideToBePositioned}>
      <a href={mobileAppUrl} rel={'noreferrer'} target={'_blank'}>
        <Image
          src={storeName === 'App Store' ? Apple : Google}
          alt={storeName}
          width={170}
          height={66}
          placeholder={'blur'}
        />
      </a>
      <QrContent>
        <QrCode
          value={mobileAppUrl}
          size={120}
          renderAs={'svg'}
          fgColor={'#000'}
        />
      </QrContent>
    </Content>
  )
}

export default StoreContent
