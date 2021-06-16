import { FC, useCallback, useState } from 'react'
import Image from 'next/image'
import QrCode from 'qrcode.react'
import { Content, QrContent } from './style'
import Apple from '@assets/images/Apple.png'
import Google from '@assets/images/Google.png'

interface IProps {
  store: string
  qrValue: string
}

const DesktopStoreContent: FC<IProps> = props => {
  const { store, qrValue } = props
  const [mouseOver, setMouseOver] = useState<boolean>(false)

  const handleMouseMove = useCallback((): void => {
    setMouseOver(!mouseOver)
  }, [setMouseOver, mouseOver])

  return (
    <Content>
      <Image
        src={store === 'Apple' ? Apple : Google}
        alt={'Mobile Store Image'}
        width={170}
        height={70}
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

export default DesktopStoreContent
