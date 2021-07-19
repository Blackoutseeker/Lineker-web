import styled from 'styled-components'

export const HeaderContainer = styled.header`
  position: sticky;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 0 40px;
  background-color: ${({ theme }) => theme.colors.primary};
  box-shadow: ${({ theme }) => theme.shadow};
  @media screen and (max-width: 640px) {
    padding: 0;
  }
`

export const Button = styled.button`
  outline: none;
  border: none;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  margin: 0 10px;
  border-radius: 50%;
  cursor: pointer;
  transition: 200ms;
  :hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`

export const ExpandedContent = styled.div`
  max-width: 233px;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const TitleContent = styled(ExpandedContent)`
  @media screen and (max-width: 900px) {
    display: none;
  }
`

export const SearchContent = styled.div`
  position: sticky;
  min-width: 350px;
  display: flex;
  flex: 1;
  align-items: center;
`

export const SearchIconContent = styled.div`
  position: absolute;
  top: 7px;
  left: 15px;
`

export const SearchInput = styled.input`
  outline: none;
  border: none;
  width: 100%;
  height: 35px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 4px;
  padding-left: 50px;
  padding-right: 20px;
  color: #fff;
  font-size: 20px;
  transition: 200ms;
  ::placeholder {
    color: ${({ theme }) => theme.colors.placeholder};
  }
  :hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`

export const SwitchButton = styled.button`
  outline: none;
  border: none;
  display: flex;
  align-items: center;
  flex-direction: row;
  background-color: transparent;
  cursor: pointer;
`

export const SwitchTrack = styled.div`
  width: 40px;
  height: 20px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 20px;
  .switch-thumb-left {
    transform: translate(-2px, -2.5px);
  }
  .switch-thumb-right {
    transform: translate(18px, -2.5px);
  }
`

export const SwitchThumb = styled.div`
  width: 25px;
  height: 25px;
  background-color: ${({ theme }) => theme.colors.secundary};
  border-radius: 50%;
  transition: 200ms;
  box-shadow: ${({ theme }) => theme.shadow};
`
