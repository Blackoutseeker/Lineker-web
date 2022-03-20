import styled from 'styled-components'

export const BackButtonContent = styled.button`
  outline: none;
  border: none;
  position: fixed;
  top: 20px;
  left: 20px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: transparent;
  cursor: pointer;
  transition: 200ms;
  :hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`
