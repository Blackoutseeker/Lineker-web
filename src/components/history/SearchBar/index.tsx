import { FC } from 'react'
import { SearchBarContainer, SearchIconContent, SearchInput } from './styles'
import { FaSearch } from 'react-icons/fa'

interface SearchBarProps {
  search: string
  setSearch: (search: string) => void
}

const SearchBar: FC<SearchBarProps> = ({ search, setSearch }) => {
  return (
    <SearchBarContainer>
      <SearchIconContent>
        <FaSearch color={'#fff'} size={15} />
        <SearchInput
          placeholder={'Search for a title, url, date or time'}
          value={search}
          onChange={({ target }) => {
            setSearch(target.value)
          }}
        />
      </SearchIconContent>
    </SearchBarContainer>
  )
}

export default SearchBar
