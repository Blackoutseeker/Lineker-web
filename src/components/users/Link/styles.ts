import styled from 'styled-components'

export const LinkContainer = styled.div`
  width: 60%;
  padding: 5px;
  margin: 20px;
  display: flex;
  align-items: center;
  background-color: transparent;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  transition: 200ms;
  :hover {
    background-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadow};
  }
  @media screen and (max-width: 900px) {
    width: 75%;
  }
`

export const Button = styled.button`
  outline: none;
  border: none;
  width: 90px;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border-radius: 4px;
  cursor: pointer;
  transition: 200ms;
  :hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`

export const DeleteButton = styled.button`
  outline: none;
  border: none;
  width: 90px;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border-radius: 4px;
  cursor: pointer;
  transition: 200ms;
  :hover {
    background-color: ${({ theme }) => theme.colors.red};
  }
`

export const InfoContainer = styled.div`
  height: 90px;
  width: calc(100% - 90px * 3);
  display: flex;
  flex-direction: column;
  padding: 0 10px;
`

export const InfoContent = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  overflow-x: auto;
  white-space: nowrap;
  ::-webkit-scrollbar {
    height: 4px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.scrollThumb};
  }
  ::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.colors.scrollTrack};
  }
`

export const BottomInfoContent = styled.div`
  display: flex;
  flex-direction: row;
`

export const DateContent = styled.div`
  min-height: 45px;
  display: flex;
  align-items: center;
  margin-left: 20px;
  @media screen and (max-width: 700px) {
    display: none;
  }
`

export const LinkTitle = styled.span`
  color: #fff;
  font-size: 26px;
`

export const LinkUrl = styled.a`
  color: #0a80bb;
  font-size: 22px;
  text-decoration: none;
  transition: 200ms;
  :hover {
    text-decoration: underline;
  }
`

export const DateText = styled.span`
  color: #0a80bb;
  font-size: 20px;
`
