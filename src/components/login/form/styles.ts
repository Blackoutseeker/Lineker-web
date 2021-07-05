import styled from 'styled-components'

export const FormContainer = styled.form`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 15px 0;
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

export const Button = styled.button`
  outline: none;
  border: none;
  width: 80%;
  max-width: 450px;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.secundary};
  box-shadow: ${({ theme }) => theme.shadow};
  display: grid;
  place-items: center;
  border-radius: 4px;
  margin: 15px 0;
  cursor: pointer;
  :disabled {
    background-color: ${({ theme }) => theme.colors.primary};
    cursor: default;
    box-shadow: none;
  }
`

export const ButtonText = styled.span`
  color: #fff;
  font-size: 25px;
`
