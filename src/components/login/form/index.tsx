import { FC, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import {
  Button,
  ButtonText,
  Description,
  FormContainer,
  Input,
  ReCAPTCHAContent,
  LogoContent,
  SimpleText,
  SimpleTextContent
} from './styles'
import Title from '@components/Title'
import Lineker from '@assets/images/Lineker.png'
import ReCAPTCHA from 'react-google-recaptcha'
import firebaseClient from '@utils/firebaseClient'

const Form: FC = () => {
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [creatingAccount, setCreatingAccount] = useState<boolean>(false)
  const [reCAPTCHAToken, setReCAPTCHAToken] = useState<string | null>(null)

  const signIn = async () => {
    await firebaseClient
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        router.push({
          pathname: `/users/${user?.uid}`,
          query: {
            currentFilter: 'Default'
          }
        })
      })
      .catch(({ message }) => {
        console.log(message)
      })
  }

  const isValidForm: boolean = email.includes('@') && password.length >= 6

  const handleEnterKeyDown = (key: string) => {
    if (key === 'Enter' && isValidForm) {
      signIn()
    }
  }

  return (
    <FormContainer onSubmit={!creatingAccount ? signIn : () => {}}>
      <Title size={45} />
      <LogoContent>
        <Image src={Lineker} alt={'Lineker Logo'} width={180} height={180} />
      </LogoContent>
      <Description>Access links between your devices</Description>
      <Input
        placeholder={'Email address'}
        type={'email'}
        value={email}
        onKeyDown={({ key }) => handleEnterKeyDown(key)}
        onChange={({ target }) => {
          setEmail(target.value)
        }}
      />
      {!creatingAccount ? (
        <Input
          placeholder={'Password'}
          type={'password'}
          value={password}
          onKeyDown={({ key }) => handleEnterKeyDown(key)}
          onChange={({ target }) => {
            setPassword(target.value)
          }}
        />
      ) : (
        <SimpleTextContent>
          <SimpleText enableHover={false}>
            The password must have 6 or more characters
          </SimpleText>
        </SimpleTextContent>
      )}
      {!creatingAccount ? (
        <SimpleTextContent>
          <SimpleText enableHover={true}>Forgot your password?</SimpleText>
        </SimpleTextContent>
      ) : (
        <Input
          placeholder={'Password'}
          type={'password'}
          onChange={({ target }) => {
            setPassword(target.value)
          }}
        />
      )}
      {!creatingAccount ? null : (
        <ReCAPTCHAContent>
          <ReCAPTCHA
            sitekey={process.env.RECAPTCHA_SITE_KEY!}
            onChange={value => {
              setReCAPTCHAToken(value)
            }}
          />
        </ReCAPTCHAContent>
      )}
      <Button type={'submit'} disabled={!isValidForm}>
        <ButtonText>{!creatingAccount ? 'Sign-in' : 'Sign-up'}</ButtonText>
      </Button>
      <SimpleText
        enableHover={true}
        onClick={() => {
          setCreatingAccount(!creatingAccount)
        }}
      >
        {!creatingAccount
          ? "Don't have an account? Do it now!"
          : 'Already have an account? So sign-in!'}
      </SimpleText>
    </FormContainer>
  )
}

export default Form
