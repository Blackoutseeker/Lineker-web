import styled from 'styled-components'

interface ButtonStyle {
  isVisible?: boolean
}

export const Button = styled.button<ButtonStyle>`
  outline: none;
  border: none;
  position: fixed;
  bottom: 100px;
  right: 20px;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 50%;
  box-shadow: ${({ theme }) => theme.shadow};
  cursor: pointer;
  transition: 200ms;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  :hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`
