import { FC, useCallback, memo } from 'react'
import { Button } from './styles'
import { HiPlus } from 'react-icons/hi'

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
    <Button
      onClick={showAddLinkModal}
      title={'Add New Link'}
      data-cy={'floating-action-button'}
    >
      <HiPlus color={'#fff'} size={25} />
    </Button>
  )
}

export default memo(FloatingActionButton)
