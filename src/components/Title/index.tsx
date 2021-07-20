import { FC } from 'react'
import TitleText from './styles'

interface TitleProps {
  size?: number
}

const Title: FC<TitleProps> = props => {
  const { size } = props

  return (
    <TitleText size={size ?? 24} className={'title'}>
      Lin<TitleText className={'alternative-title'}>e</TitleText>k
      <TitleText className={'alternative-title'}>er</TitleText>
    </TitleText>
  )
}

export default Title
