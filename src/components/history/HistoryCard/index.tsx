import { FC } from 'react'
import {
  CardContainer,
  CardHeader,
  HeaderTitle,
  DeleteAllButton,
  Divider
} from './styles'
import { removeAllHistoryFromDatabase } from '@database/history'

interface HistoryCardProps {
  uid: string | undefined
}

const HistoryCard: FC<HistoryCardProps> = ({ uid, children }) => {
  const deleteAllHistory = async () => {
    if (uid) {
      await removeAllHistoryFromDatabase(uid)
    }
  }

  return (
    <CardContainer>
      <CardHeader>
        <HeaderTitle>History</HeaderTitle>
        <DeleteAllButton
          onClick={deleteAllHistory}
          title={'Delete all history'}
          data-cy={'delete-all-history-button'}
        >
          Delete all
        </DeleteAllButton>
      </CardHeader>
      <Divider />
      {children}
    </CardContainer>
  )
}

export default HistoryCard
