import styled from 'styled-components'

export const ConfirmationModalHolder = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ConfirmationModal = styled.div`
  width: 340px;
  height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 4px;
  box-shadow: ${({ theme }) => theme.shadow};
`

export const ModalTitle = styled.span`
  color: #fff;
  font-size: 20px;
  margin: 0 10px;
`

export const ButtonsRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`

const Button = styled.button`
  outline: none;
  border: 1px solid ${({ theme }) => theme.colors.dismissButton};
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border-radius: 4px;
  cursor: pointer;
  transition: 200ms;
  :hover > span {
    color: #fff;
  }
`

export const DismissModalButton = styled(Button)`
  :hover {
    background-color: ${({ theme }) => theme.colors.dismissButton};
  }
  :hover > span {
    color: #fff;
  }
`

export const ConfirmButton = styled(Button)`
  margin: 0 10px;
  :hover {
    background-color: ${({ theme }) => theme.colors.red};
    border: none;
  }
`

export const ButtonText = styled.span`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.dismissButton};
`
