import styled from 'styled-components'

export const AddLinkModalHolder = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const AddModal = styled.div`
  width: 540px;
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 4px;
  box-shadow: ${({ theme }) => theme.shadow};
`

export const ContentRow = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  margin: 10px 0;
`

export const Input = styled.input`
  outline: none;
  border: none;
  display: flex;
  flex: 1;
  min-height: 40px;
  padding: 0 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 20px;
  color: #fff;
  font-size: 22px;
  ::placeholder {
    color: ${({ theme }) => theme.colors.placeholder};
  }
`

export const AddLinkButton = styled.button`
  outline: none;
  border: none;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 35px;
  box-shadow: ${({ theme }) => theme.shadow};
  cursor: pointer;
  transition: 200ms;
  :hover {
    background-color: ${({ theme }) => theme.colors.green};
  }
`
