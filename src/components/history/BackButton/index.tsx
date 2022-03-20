import { FC } from 'react'
import { useRouter } from 'next/router'
import { BackButtonContent } from './styles'
import { HiOutlineArrowLeft } from 'react-icons/hi'
import { Pages } from '@utils/constants'

const BackButton: FC = () => {
  const router = useRouter()

  const backToPreviousPage = () => {
    router.push(Pages.USER)
  }

  return (
    <BackButtonContent onClick={backToPreviousPage} title={'Back'}>
      <HiOutlineArrowLeft color={'#fff'} size={30} />
    </BackButtonContent>
  )
}

export default BackButton
