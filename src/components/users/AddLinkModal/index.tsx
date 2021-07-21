import { FC, useCallback, useState } from 'react'
import { format } from 'date-fns'
import useAuth from '@services/auth'
import Image from 'next/image'
import { LinkItem } from '../Link'
import {
  AddLinkModalHolder,
  AddModal,
  ContentRow,
  Input,
  AddLinkButton
} from './styles'
import OutsideClickHandler from 'react-outside-click-handler'
import PlusIcon from '@assets/icons/plus.svg'
import firebase from '@utils/firebaseClient'

interface AddLinkModalProps {
  showAddLinkModal: boolean
  setShowAddLinkModal: (value: boolean) => void
  currentFilter: string
}

const AddLinkModal: FC<AddLinkModalProps> = ({
  showAddLinkModal,
  setShowAddLinkModal,
  currentFilter
}) => {
  const auth = useAuth()
  const [titleInputValue, setTitleInputValue] = useState<string>('')
  const [urlInputValue, setUrlInputValue] = useState<string>('')

  const hideAddLinkModal = useCallback(() => {
    setShowAddLinkModal(false)
    setTitleInputValue('')
    setUrlInputValue('')
  }, [setShowAddLinkModal])

  const createFilterIfNotExists = useCallback(async () => {
    await firebase
      .database()
      .ref(`users/${auth.user!.uid}/filters/${currentFilter}`)
      .set({
        filter: currentFilter
      })
  }, [auth.user, currentFilter])

  const addNewLink = useCallback(async () => {
    if (urlInputValue !== '') {
      const date = format(new Date(), 'dd/MM/yyyy')
      const datetime = format(new Date(), 'dd-MM-yyyy-kk:mm:ss')

      const link: LinkItem = {
        title: titleInputValue === '' ? 'Untitled' : titleInputValue,
        url: urlInputValue,
        date,
        datetime
      }

      await createFilterIfNotExists()
      await firebase
        .database()
        .ref(`users/${auth.user!.uid}/links/${currentFilter}/${datetime}`)
        .set(link)
        .then(hideAddLinkModal)
    }
  }, [
    titleInputValue,
    urlInputValue,
    auth.user,
    currentFilter,
    createFilterIfNotExists,
    hideAddLinkModal
  ])

  const handleEnterKeyDown = (key: string) => {
    if (key === 'Enter') {
      addNewLink()
    }
  }

  return (
    <AddLinkModalHolder
      className={`${showAddLinkModal ? 'show' : 'hide'}-add-holder`}
    >
      <OutsideClickHandler onOutsideClick={hideAddLinkModal}>
        <AddModal>
          <ContentRow>
            <Input
              placeholder={'Title'}
              value={titleInputValue}
              onChange={({ target }) => {
                setTitleInputValue(target.value)
              }}
              onKeyDown={({ key }) => {
                handleEnterKeyDown(key)
              }}
              data-cy={'title-input'}
            />
          </ContentRow>
          <ContentRow>
            <Input
              placeholder={'URL'}
              value={urlInputValue}
              onChange={({ target }) => {
                setUrlInputValue(target.value)
              }}
              onKeyDown={({ key }) => {
                handleEnterKeyDown(key)
              }}
              data-cy={'url-input'}
            />
            <AddLinkButton onClick={addNewLink}>
              <Image src={PlusIcon} alt={'Add Link'} width={20} height={20} />
            </AddLinkButton>
          </ContentRow>
        </AddModal>
      </OutsideClickHandler>
    </AddLinkModalHolder>
  )
}

export default AddLinkModal
