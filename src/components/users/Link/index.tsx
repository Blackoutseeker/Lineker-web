import { FC, memo } from 'react'
import LinkItem from '@models/linkItem'
import {
  LinkContainer,
  Button,
  DeleteButton,
  InfoContainer,
  InfoContent,
  BottomInfoContent,
  DateContent,
  LinkTitle,
  LinkUrl,
  DateText
} from './styles'
import QrCode from 'qrcode.react'
import { FaCopy, FaTrash } from 'react-icons/fa'

interface LinkProps extends LinkItem {
  setDeleteLinkDatetime: (datetime: string) => void
  setQrModalUrl: (url: string) => void
}

const Link: FC<LinkProps> = props => {
  const {
    title,
    url,
    date,
    datetime,
    setDeleteLinkDatetime,
    setQrModalUrl
  } = props

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(url)
  }

  const showDeleteConfirmation = () => {
    setDeleteLinkDatetime(datetime)
  }

  const showQrModal = () => {
    setQrModalUrl(url)
  }

  return (
    <LinkContainer data-cy={`${title}-link`}>
      <Button onClick={showQrModal} title={'See Qr Code'}>
        <QrCode
          value={url}
          size={75}
          fgColor={'#fff'}
          bgColor={'transparent'}
          renderAs={'svg'}
        />
      </Button>
      <InfoContainer>
        <InfoContent>
          <LinkTitle>{title}</LinkTitle>
        </InfoContent>
        <BottomInfoContent>
          <InfoContent>
            <LinkUrl href={url} target={'_blank'}>
              {url}
            </LinkUrl>
          </InfoContent>
          <DateContent>
            <DateText>{date}</DateText>
          </DateContent>
        </BottomInfoContent>
      </InfoContainer>
      <Button
        onClick={copyToClipboard}
        title={'Copy To Clipboard'}
        data-cy={`copy-${title}`}
      >
        <FaCopy color={'#fff'} size={25} />
      </Button>
      <DeleteButton
        onClick={showDeleteConfirmation}
        title={'Delete Link'}
        data-cy={`delete-${title}`}
      >
        <FaTrash color={'#fff'} size={25} />
      </DeleteButton>
    </LinkContainer>
  )
}

export default memo(Link)
