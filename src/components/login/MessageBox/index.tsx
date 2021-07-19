import { FC, memo } from 'react'
import Image from 'next/image'
import { BoxContainer, MessageContent, MessageText, IconBox } from './styles'
import WarnIcon from '@assets/icons/warn.svg'

export enum BoxTypes {
  ERROR = 'error-box',
  PASSWORD = 'password-box',
  HIDE = ''
}

interface MessageBoxProps {
  boxType: BoxTypes
  message: string
}

const MessageBox: FC<MessageBoxProps> = ({ boxType, message }) => {
  return (
    <BoxContainer
      className={`${boxType} ${
        boxType !== BoxTypes.HIDE ? 'visible-box' : 'hidden-box'
      }`}
      data-cy={'message-box'}
    >
      <MessageContent>
        <MessageText>{message}</MessageText>
      </MessageContent>
      <IconBox>
        <Image src={WarnIcon} alt={'Warning'} />
      </IconBox>
    </BoxContainer>
  )
}

export default memo(MessageBox)
