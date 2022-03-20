import { FC, useState } from 'react'
import { format } from 'date-fns'
import { useAuth } from '@services/authProvider'
import LinkItem from '@models/linkItem'
import HistoryItem from '@models/historyItem'
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
import { addNewHistoryItemIntoDatabase } from '@database/history'

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
      const currentDate: Date = new Date()
      const date: string = format(currentDate, 'dd/MM/yyyy')
      const datetime: string = format(currentDate, 'dd-MM-yyyy-HH:mm:ss')
      const time: string = format(currentDate, 'HH:mm:ss')

      const linkItem: LinkItem = {
        title: titleInputValue === '' ? 'Untitled' : titleInputValue,
        url: urlInputValue,
        date,
        datetime
      }

      await addNewLinkToDatabase(auth.user!.uid, currentFilter, linkItem)

      const historyItem: HistoryItem = {
        title: linkItem.title,
        url: linkItem.url,
        date,
        datetime,
        time
      }

      await addNewHistoryItemIntoDatabase(
        auth.user!.uid,
        historyItem,
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
