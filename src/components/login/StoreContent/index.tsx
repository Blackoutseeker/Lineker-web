import { FC, useState } from 'react'
import Image from 'next/image'
import QrCode from 'qrcode.react'
import { Content, QrContent } from './styles'
import Apple from '@assets/images/Apple.png'
import Google from '@assets/images/Google.png'

interface StoreContentProps {
  store: string
  qrValue: string
}

const StoreContent: FC<StoreContentProps> = ({ store, qrValue }) => {
  const [mouseOver, setMouseOver] = useState<boolean>(false)

  const handleMouseMove = () => {
    setMouseOver(!mouseOver)
  }

  return (
    <Content>
      <Image
        src={store === 'App Store' ? Apple : Google}
        alt={store}
        width={170}
        height={66}
      />
      <QrContent onMouseOver={handleMouseMove} onMouseOut={handleMouseMove}>
        <QrCode
          value={qrValue}
          size={120}
          renderAs={'svg'}
          fgColor={mouseOver ? '#000' : '#fff'}
          bgColor={mouseOver ? '#fff' : 'transparent'}
        />
      </QrContent>
    </Content>
  )
}

export default StoreContent
