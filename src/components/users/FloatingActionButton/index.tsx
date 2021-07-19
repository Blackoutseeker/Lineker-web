import { FC, useCallback, memo } from 'react'
import Image from 'next/image'
import { Button } from './styles'
import Plus from '@assets/icons/plus.svg'

interface FloatingActionButtonProps {
  setShowAddLinkModal: (value: boolean) => void
}

const FloatingActionButton: FC<FloatingActionButtonProps> = ({
  setShowAddLinkModal
}) => {
  const showAddLinkModal = useCallback(() => {
    setShowAddLinkModal(true)
  }, [setShowAddLinkModal])

  return (
    <Button onClick={showAddLinkModal} data-cy={'floating-action-button'}>
      <Image src={Plus} alt={'Add Link'} width={20} height={20} />
    </Button>
  )
}

export default memo(FloatingActionButton)
