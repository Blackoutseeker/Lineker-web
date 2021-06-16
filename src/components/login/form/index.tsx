import { FC, useState } from 'react'
import Image from 'next/image'
import {
  Button,
  ButtonText,
  Description,
  FormContainer,
  Input,
  LogoContent,
  SimpleText,
  SimpleTextContent
} from './style'
import Title from '@components/title'
import Lineker from '@assets/images/Lineker.png'

const Form: FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [createAccount, setCreateAccount] = useState<boolean>(false)

  const toggleCreateAccount = (): void => {
    setCreateAccount(!createAccount)
  }

  return (
    <FormContainer>
      <Title size={45} />
      <LogoContent>
        <Image src={Lineker} alt={'Lineker Logo'} width={180} height={180} />
      </LogoContent>
      <Description>Access links between your devices</Description>
      <Input placeholder={'Email address'} type={'email'} />
      {!createAccount ? (
        <Input placeholder={'Password'} type={'password'} />
      ) : (
        <SimpleTextContent>
          <SimpleText enableHover={false}>
            The password must have 6 or more characters
          </SimpleText>
        </SimpleTextContent>
      )}
      {!createAccount ? (
        <SimpleTextContent>
          <SimpleText enableHover={true}>Forgot your password?</SimpleText>
        </SimpleTextContent>
      ) : (
        <Input placeholder={'Password'} type={'password'} />
      )}
      <Button>
        <ButtonText>{!createAccount ? 'Sign-in' : 'Sign-up'}</ButtonText>
      </Button>
      <SimpleText enableHover={true} onClick={toggleCreateAccount}>
        {!createAccount
          ? "Don't have an account? Do it now!"
          : 'Already have an account? Then sign-in!'}
      </SimpleText>
    </FormContainer>
  )
}

export default Form
