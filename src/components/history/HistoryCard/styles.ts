import styled from 'styled-components'

export const CardContainer = styled.div`
  width: 80%;
  max-width: 940px;
  display: flex;
  flex-direction: column;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  margin-top: 80px;
  margin-bottom: 40px;
  padding: 20px;
  :hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`

export const CardHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const HeaderTitle = styled.h3`
  color: #fff;
  font-size: 28px;
`

export const DeleteAllButton = styled.button`
  outline: none;
  border: none;
  background-color: transparent;
  border: 2px solid #fff;
  border-radius: 4px;
  padding: 10px 20px;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  transition: 200ms;
  :hover {
    background-color: ${({ theme }) => theme.colors.red};
    border-color: transparent;
  }
`

export const Divider = styled.hr`
  border-color: rgba(255, 255, 255, 0.4);
  margin: 20px 0;
`
