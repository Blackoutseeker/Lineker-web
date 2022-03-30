import { FC, useState, useEffect, useCallback } from 'react'
import { Button } from './styles'
import { FaChevronUp } from 'react-icons/fa'

const UpButton: FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const backToTop = () => {
    window.scroll({
      top: 0
    })
  }

  const handlePageScrollY = useCallback(() => {
    const scrollY = window.scrollY
    if (scrollY > 140) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handlePageScrollY)
    return () => {
      window.removeEventListener('scroll', handlePageScrollY)
    }
  }, [handlePageScrollY])

  return (
    <Button
      onClick={backToTop}
      isVisible={isVisible}
      title={'Back To Top'}
      data-cy={'up-button'}
    >
      <FaChevronUp color={'#fff'} size={20} />
    </Button>
  )
}

export default UpButton
