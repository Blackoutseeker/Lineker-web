import { FC, useState } from 'react'
import { format } from 'date-fns'
import { useAuth } from '@services/authProvider'
import LinkItem from '@models/linkItem'
import {
  AddLinkModalHolder,
  AddModal,
  ContentRow,
  Input,
  AddLinkButton
} from './styles'
import OutsideClickHandler from 'react-outside-click-handler'
import { HiPlus } from 'react-icons/hi'
import { addNewLinkToDatabase } from '@database/link'

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

  const hideAddLinkModal = () => {
    setShowAddLinkModal(false)
    setTitleInputValue('')
    setUrlInputValue('')
  }

  const addNewLink = async () => {
    const urlInputValueIsNotEmpty = urlInputValue.length > 0
    const userIsAuthenticated = auth.user !== null
    if (urlInputValueIsNotEmpty && userIsAuthenticated) {
      const date: string = format(new Date(), 'dd/MM/yyyy')
      const datetime: string = format(new Date(), 'dd-MM-yyyy-kk:mm:ss')

      const linkItem: LinkItem = {
        title: titleInputValue === '' ? 'Untitled' : titleInputValue,
        url: urlInputValue,
        date,
        datetime
      }

      await addNewLinkToDatabase(
        auth.user!.uid,
        currentFilter,
        linkItem,
        hideAddLinkModal
      )
    }
  }

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
              <HiPlus color={'#fff'} size={25} />
            </AddLinkButton>
          </ContentRow>
        </AddModal>
      </OutsideClickHandler>
    </AddLinkModalHolder>
  )
}

export default AddLinkModal
