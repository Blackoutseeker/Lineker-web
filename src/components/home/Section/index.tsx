import { FC } from 'react'
import Image from 'next/image'
import { SectionContainer, SectionTitle } from './styles'

interface SectionProps {
  title: string
  imageUrl: any
  imageWidth: number
  imageHeight: number
}

const Section: FC<SectionProps> = props => {
  const { title, imageUrl, imageWidth, imageHeight } = props

  return (
    <SectionContainer>
      <SectionTitle>{title}</SectionTitle>
      <Image
        src={imageUrl}
        alt={title}
        width={imageWidth}
        height={imageHeight}
        quality={'85%'}
        placeholder={'blur'}
      />
    </SectionContainer>
  )
}

export default Section
