import { FC, memo } from 'react'
import { useAuth } from '@services/authProvider'
import {
  ConfirmationModalHolder,
  ConfirmationModal,
  ModalTitle,
  ButtonsRow,
  DismissModalButton,
  ConfirmButton,
  ButtonText
} from './styles'
import OutsideClickHandler from 'react-outside-click-handler'
import { removeLinkFromDatabase } from '@database/link'

interface DeleteConfirmationProps {
  linkDatetime: string
  setLinkDatetime: (value: string) => void
  currentFilter: string
}

const DeleteConfirmation: FC<DeleteConfirmationProps> = ({
  linkDatetime,
  setLinkDatetime,
  currentFilter
}) => {
  const auth = useAuth()

  const hideConfirmation = () => {
    setLinkDatetime('')
  }

  const deleteLink = async () => {
    const userIsAuthenticated = auth.user !== null
    if (userIsAuthenticated) {
      await removeLinkFromDatabase(
        auth.user!.uid,
        currentFilter,
        linkDatetime,
        hideConfirmation
      )
    }
  }

  return (
    <ConfirmationModalHolder
      className={`${linkDatetime !== '' ? 'show' : 'hide'}-confirmation-holder`}
    >
      <OutsideClickHandler onOutsideClick={hideConfirmation}>
        <ConfirmationModal>
          <ModalTitle>Are you sure?</ModalTitle>
          <ButtonsRow>
            <ConfirmButton onClick={deleteLink} data-cy={'confirm-button'}>
              <ButtonText>Yes</ButtonText>
            </ConfirmButton>
            <DismissModalButton onClick={hideConfirmation}>
              <ButtonText>No</ButtonText>
            </DismissModalButton>
          </ButtonsRow>
        </ConfirmationModal>
      </OutsideClickHandler>
    </ConfirmationModalHolder>
  )
}

export default memo(DeleteConfirmation)
