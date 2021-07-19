import styled from 'styled-components'

export const BoxContainer = styled.div`
  position: fixed;
  width: 80%;
  max-width: 450px;
  height: 80px;
  display: flex;
  flex-direction: row;
  border-radius: 4px;
  box-shadow: ${({ theme }) => theme.shadow};
  transition: 200ms;
`

export const MessageContent = styled.div`
  display: flex;
  flex: 1;
  padding: 10px 20px;
  overflow: hidden;
`

export const MessageText = styled.span`
  color: #fff;
  font-size: 18px;
  line-height: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const IconBox = styled.div`
  width: 80px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
`
