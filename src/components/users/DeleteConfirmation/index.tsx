import { FC, useCallback, memo } from 'react'
import useAuth from '@services/auth'
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
import firebase from '@utils/firebaseClient'

interface DeleteConfirmationProps {
  deleteLinkDatetime: string
  setDeleteLinkDatetime: (value: string) => void
  currentFilter: string
}

const DeleteConfirmation: FC<DeleteConfirmationProps> = ({
  deleteLinkDatetime,
  setDeleteLinkDatetime,
  currentFilter
}) => {
  const auth = useAuth()

  const hideConfirmation = useCallback(() => {
    setDeleteLinkDatetime('')
  }, [setDeleteLinkDatetime])

  const deleteLink = useCallback(async () => {
    await firebase
      .database()
      .ref(
        `users/${auth!.user!.uid}/links/${currentFilter}/${deleteLinkDatetime}`
      )
      .remove()
      .then(hideConfirmation)
  }, [auth, currentFilter, deleteLinkDatetime, hideConfirmation])

  return (
    <ConfirmationModalHolder
      className={`${
        deleteLinkDatetime !== '' ? 'show' : 'hide'
      }-confirmation-holder`}
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
