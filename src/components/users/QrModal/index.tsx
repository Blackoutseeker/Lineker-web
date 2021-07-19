import { FC, useCallback } from 'react'
import { QrModalHolder, QrContent } from './styles'
import QrCode from 'qrcode.react'
import OutsideClickHandler from 'react-outside-click-handler'

interface QrModalProps {
  qrModalUrl: string
  setQrModalUrl: (value: string) => void
}

const QrModal: FC<QrModalProps> = ({ qrModalUrl, setQrModalUrl }) => {
  const hideQrModal = useCallback(() => {
    setQrModalUrl('')
  }, [setQrModalUrl])

  return (
    <QrModalHolder
      className={`${qrModalUrl !== '' ? 'show' : 'hide'}-qr-holder`}
    >
      <OutsideClickHandler onOutsideClick={hideQrModal}>
        <QrContent>
          <QrCode
            value={qrModalUrl}
            fgColor={'#000'}
            bgColor={'#fff'}
            renderAs={'svg'}
            size={300}
          />
        </QrContent>
      </OutsideClickHandler>
    </QrModalHolder>
  )
}

export default QrModal
