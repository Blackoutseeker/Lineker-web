import styled from 'styled-components'

export const FormContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 15px 0;
  .error-box {
    background-color: #c00;
  }
  .password-box {
    background-color: ${({ theme }) => theme.colors.secundary};
  }
  .hidden-box {
    visibility: hidden;
    top: -90px;
    opacity: 0;
  }
  .visible-box {
    visibility: visible;
    top: 40px;
    opacity: 1;
  }
`

export const LogoContent = styled.div`
  margin: 15px 0;
`

export const Description = styled.span`
  color: #fff;
  font-size: 25px;
  text-align: center;
  margin: 0 10px;
  cursor: default;
`

export const Input = styled.input`
  outline: none;
  border: none;
  width: 80%;
  max-width: 450px;
  min-height: 50px;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #fff;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  margin-top: 15px;
  padding: 0 10px;
  color: #fff;
  font-size: 25px;
  transition: 200ms;
  ::placeholder {
    color: ${({ theme }) => theme.colors.placeholder};
  }
  :hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`

export const ReCAPTCHAContent = styled.div`
  margin-top: 15px;
`

interface IProps {
  enableHover: boolean
}

export const SimpleTextContent = styled.div`
  width: 80%;
  max-width: 450px;
  margin-top: 15px;
`

export const SimpleText = styled.span`
  color: #fff;
  font-size: 18px;
  cursor: default;
  :hover {
    cursor: ${(props: IProps) => (props.enableHover ? 'pointer' : 'default')};
    text-decoration: ${(props: IProps) =>
      props.enableHover ? 'underline' : 'none'};
  }
`

const Button = styled.button`
  outline: none;
  border: none;
  width: 80%;
  max-width: 450px;
  height: 50px;
  box-shadow: ${({ theme }) => theme.shadow};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: 4px;
  margin: 15px 0;
  cursor: pointer;
`

export const LoginButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.secundary};
  :disabled {
    background-color: ${({ theme }) => theme.colors.primary};
    cursor: default;
    box-shadow: none;
  }
`

export const GoogleLoginButton = styled(Button)`
  background-color: #fff;
  margin-top: 5px;
`

const ButtonText = styled.span`
  font-size: 25px;
`

export const LoginButtonText = styled(ButtonText)`
  color: #fff;
`

export const GoogleLoginButtonText = styled(ButtonText)`
  color: #333;
  font-weight: bold;
`
