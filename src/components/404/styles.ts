import styled from 'styled-components'

export const TextsContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background};
`

export const ErrorTitle = styled.span`
  color: #fff;
  font-size: 36px;
  margin: 30px;
`

export const Message = styled.span`
  color: #fff;
  font-size: 28px;
  margin: 30px;
`
