import styled from 'styled-components'

export const Button = styled.button`
  outline: none;
  border: none;
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.secundary};
  border-radius: 50%;
  box-shadow: ${({ theme }) => theme.shadow};
  cursor: pointer;
  transition: 200ms;
  :hover {
    background-color: ${({ theme }) => theme.colors.green};
  }
`
