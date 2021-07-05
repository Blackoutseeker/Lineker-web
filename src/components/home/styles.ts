import styled from 'styled-components'

export const TitleContent = styled.div`
  margin: 20px 0;
`

export const Slogan = styled.span`
  color: #fff;
  font-size: 36px;
  text-align: center;
  margin: 20px 20px;
`

export const ButtonContent = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  @media screen and (max-width: 450px) {
    display: none;
  }
`

const Button = styled.a`
  width: 250px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  margin: 20px 10px;
  text-decoration: none;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadow};
`

export const SignInButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.secundary};
`

export const SourceCodeButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.title};
`

export const ButtonText = styled.span`
  color: #fff;
  font-size: 26px;
`

export const StoreContent = styled.a`
  display: none;
  @media screen and (max-width: 450px) {
    display: flex;
  }
`

export const Description = styled.p`
  color: #fff;
  font-size: 28px;
  margin: 20px;
  text-align: justify;
  width: 60%;
  @media screen and (max-width: 870px) {
    width: 80%;
  }
`

export const ShowOffContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.secundary};
  padding: 0 20px;
`
