import { FC, memo } from 'react'
import { BoxContainer, MessageContent, MessageText, IconBox } from './styles'
import { AiFillWarning } from 'react-icons/ai'

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
        <AiFillWarning color={'#fff'} size={35} />
      </IconBox>
    </BoxContainer>
  )
}

export default memo(MessageBox)
