import styled from 'styled-components'

export const HistoryItemContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
`

export const HistoryItemHeader = styled.header`
  width: 100%;
  display: flex;
  margin-bottom: 5px;
`

export const TitleContent = styled.div`
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
`

export const TitleText = styled.h4`
  color: #fff;
  font-size: 22px;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const DateContent = styled.div`
  min-height: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 20px;
`

export const HistoryItemFooter = styled.footer`
  width: 100%;
  display: flex;
  margin-top: 5px;
`

export const DateText = styled.span`
  color: rgba(255, 255, 255, 0.7);
  font-size: 16px;
  white-space: nowrap;
`

export const LinkContent = styled.div`
  width: 100%;
  min-height: fit-content;
  display: flex;
  align-items: center;
  overflow-x: auto;
  padding-bottom: 4px;
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

export const LinkText = styled.a`
  outline: none;
  text-decoration: none;
  color: #0a80bb;
  font-size: 18px;
  :hover {
    text-decoration: underline;
  }
`

export const DeleteButton = styled.button`
  outline: none;
  border: none;
  min-width: 35px;
  min-height: 35px;
  background-color: transparent;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
  cursor: pointer;
  transition: 200ms;
  :hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`
