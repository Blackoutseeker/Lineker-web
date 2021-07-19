import styled from 'styled-components'

export const DrawerHolder = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  transition: 200ms;
`

export const DrawerContainer = styled.div`
  position: fixed;
  width: 350px;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 10px;
  background-color: ${({ theme }) => theme.colors.primary};
  box-shadow: ${({ theme }) => theme.shadow};
  transition: 200ms;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.scrollThumb};
  }
  ::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.colors.scrollTrack};
  }
`

export const ItemContent = styled.div`
  width: 100%;
  min-height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const BackContent = styled.div`
  position: absolute;
  left: 0;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const BackButton = styled.button`
  outline: none;
  border: none;
  width: 45px;
  height: 45px;
  padding-top: 4px;
  background-color: transparent;
  border-radius: 50%;
  cursor: pointer;
  transition: 200ms;
  :hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`

export const HeaderTitle = styled.span`
  color: #fff;
  font-size: 26px;
`

export const AddFilterInput = styled.input`
  outline: none;
  border: none;
  width: 220px;
  height: 35px;
  margin: 0 10px;
  padding: 0 20px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 20px;
  color: #fff;
  font-size: 20px;
  transition: 200ms;
  ::placeholder {
    color: ${({ theme }) => theme.colors.placeholder};
  }
  :hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`

export const AddButton = styled.button`
  outline: none;
  border: none;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
  background-color: ${({ theme }) => theme.colors.secundary};
  border-radius: 50%;
  box-shadow: ${({ theme }) => theme.shadow};
  cursor: pointer;
  transition: 200ms;
  :hover {
    background-color: ${({ theme }) => theme.colors.green};
  }
`

export const FilterContent = styled.div`
  width: 275px;
  min-height: 35px;
  display: flex;
  align-items: center;
  flex-direction: row;
  padding-right: 2px;
  margin: 12px 0;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 20px;
  transition: 200ms;
  :hover {
    background-color: ${({ theme }) => theme.colors.secundary};
    box-shadow: ${({ theme }) => theme.shadow};
  }
`

export const FilterButton = styled.button`
  outline: none;
  border: none;
  width: 90%;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 20px;
  background-color: transparent;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  cursor: pointer;
`

export const FilterButtonText = styled.span`
  width: 90%;
  color: #fff;
  font-size: 20px;
  text-align: start;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

export const DeleteFilterButton = styled.button`
  outline: none;
  border: none;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border-radius: 50%;
  cursor: pointer;
  transition: 200ms;
  :hover {
    background-color: ${({ theme }) => theme.colors.red};
  }
`
