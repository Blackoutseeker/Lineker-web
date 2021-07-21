import { FC, useCallback, memo } from 'react'
import Image from 'next/image'
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
import CopyIcon from '@assets/icons/copy.svg'
import DeleteIcon from '@assets/icons/delete.svg'

export interface LinkItem {
  title: string
  url: string
  date: string
  datetime: string
}

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

  const copyToClipboard = useCallback(async () => {
    await navigator.clipboard.writeText(url)
  }, [url])

  const showDeleteConfirmation = useCallback(() => {
    setDeleteLinkDatetime(datetime)
  }, [setDeleteLinkDatetime, datetime])

  const showQrModal = useCallback(() => {
    setQrModalUrl(url)
  }, [setQrModalUrl, url])

  return (
    <LinkContainer>
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
        <Image
          src={CopyIcon}
          alt={'Copy To Clipboard'}
          width={25.91}
          height={30}
        />
      </Button>
      <DeleteButton
        onClick={showDeleteConfirmation}
        title={'Delete Link'}
        data-cy={`delete-${title}`}
      >
        <Image src={DeleteIcon} alt={'Delete Link'} width={23.33} height={30} />
      </DeleteButton>
    </LinkContainer>
  )
}

export default memo(Link)
