import styled from 'styled-components'

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
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
  width: 80%;
  max-width: 450px;
  height: 50px;
  outline: none;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 5px solid #222;
  border-radius: 10px;
  margin-top: 15px;
  padding: 0 10px;
  color: #222;
  font-size: 25px;
  ::placeholder {
    color: #777;
  }
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
  width: 80%;
  max-width: 450px;
  height: 50px;
  background-color: transparent;
  display: grid;
  place-items: center;
  outline: none;
  border: 3px solid #fff;
  border-radius: 10px;
  margin: 15px 0;
  cursor: pointer;
  transition: 0.2s;
  :hover {
    background-color: #fff;
  }
  :hover > span {
    color: ${({ theme }) => theme.colors.background};
  }
`

export const ButtonText = styled.span`
  color: #fff;
  font-size: 25px;
`
