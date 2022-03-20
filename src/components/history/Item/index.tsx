import { FC, memo } from 'react'
import HistoryItem from '@models/historyItem'
import { removeHistoryItemFromDatabase } from '@database/history'
import Link from 'next/link'
import {
  HistoryItemContainer,
  HistoryItemHeader,
  TitleContent,
  TitleText,
  DateContent,
  DateText,
  HistoryItemFooter,
  LinkContent,
  LinkText,
  DeleteButton
} from './styles'
import { FaTrash } from 'react-icons/fa'

interface ItemProps {
  uid: string | undefined
  historyItem: HistoryItem
}

const Item: FC<ItemProps> = ({ uid, historyItem }) => {
  const { title, url, date, time, datetime } = historyItem

  const deleteHistoryItem = async () => {
    if (uid) {
      await removeHistoryItemFromDatabase(uid, datetime)
    }
  }

  return (
    <HistoryItemContainer data-cy={`history-item-${title}`}>
      <HistoryItemHeader>
        <TitleContent>
          <TitleText>{title}</TitleText>
        </TitleContent>
        <DateContent>
          <DateText>
            {date} - {time}
          </DateText>
        </DateContent>
      </HistoryItemHeader>
      <HistoryItemFooter>
        <LinkContent>
          <Link href={url} passHref={true}>
            <LinkText target={'_blank'}>{url}</LinkText>
          </Link>
        </LinkContent>
        <DeleteButton
          onClick={deleteHistoryItem}
          title={'Delete'}
          data-cy={`history-item-delete-button-${title}`}
        >
          <FaTrash color={'#fff'} size={15} />
        </DeleteButton>
      </HistoryItemFooter>
    </HistoryItemContainer>
  )
}

export default memo(Item)
