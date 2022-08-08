import type { FC, ReactNode } from 'react'
import {
  CardContainer,
  CardHeader,
  HeaderTitle,
  DeleteAllButton,
  Divider
} from './styles'
import { removeAllHistoryFromDatabase } from '@database/history'
import SearchBar from '@components/history/SearchBar'

interface HistoryCardProps {
  uid: string | undefined
  search: string
  setSearch: (search: string) => void
  children: ReactNode[] | ReactNode | undefined
}

const HistoryCard: FC<HistoryCardProps> = ({
  uid,
  search,
  setSearch,
  children
}) => {
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
      <SearchBar search={search} setSearch={setSearch} />
      {children}
    </CardContainer>
  )
}

export default HistoryCard
