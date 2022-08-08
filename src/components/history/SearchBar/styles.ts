import styled from 'styled-components'

export const SearchBarContainer = styled.div`
  width: 100%;
  height: 35px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 4px;
  padding-left: 10px;
`

export const SearchIconContent = styled.div`
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const SearchInput = styled.input`
  width: 100%;
  height: 35px;
  background-color: transparent;
  padding-right: 10px;
  margin-left: 10px;
  border: none;
  outline: none;
  color: #fff;
  font-size: 18px;
  ::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`
