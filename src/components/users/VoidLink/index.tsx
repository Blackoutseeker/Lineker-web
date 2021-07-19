import { FC } from 'react'
import Image from 'next/image'
import { Content, Text } from './styles'
import Drawer from '@assets/images/drawer.svg'

const VoidLink: FC = () => {
  return (
    <Content>
      <Text>No links found!</Text>
      <Image src={Drawer} alt={'No Links'} width={200} height={200} />
      <Text>Add a link to get started!</Text>
    </Content>
  )
}

export default VoidLink
