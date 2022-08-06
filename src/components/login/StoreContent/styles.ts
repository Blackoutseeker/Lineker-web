import styled from 'styled-components'

interface Position {
  side: 'right' | 'left'
}

export const Content = styled.div`
  position: fixed;
  ${(position: Position) => `${position.side}: 0`};
  min-width: 220px;
  height: 100vh;
  padding: 15px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
  @media screen and (max-width: 900px) {
    display: none;
  }
`

export const QrContent = styled.div`
  display: grid;
  place-items: center;
  padding: 5px;
  border: 3px solid #fff;
  border-radius: 5px;
  cursor: none;
  background-color: #fff;
`
