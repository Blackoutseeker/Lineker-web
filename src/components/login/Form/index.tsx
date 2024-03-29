import { FC, useState, FormEvent } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import {
  FormContainer,
  LogoContent,
  Description,
  Input,
  SimpleText,
  SimpleTextContent,
  ReCAPTCHAContent,
  LoginButton,
  LoginButtonText,
  GoogleLoginButton,
  GoogleLoginButtonText
} from './styles'
import Title from '@components/Title'
import LinekerLogo from '@assets/images/Lineker.png'
import MessageBox, { BoxTypes } from '@components/login/MessageBox'
import ReCAPTCHA from 'react-google-recaptcha'
import { AuthError } from 'firebase/auth'
import {
  signInWithEmailAndPasswordProvider,
  signInWithGoogleProvider,
  signUpWithEmailAndPasswordProvider,
  requestPasswordReset
} from '@services/authentication'
import { Pages } from '@utils/constants'

const Form: FC = () => {
  const router = useRouter()
  const [emailValue, setEmailValue] = useState<string>('')
  const [passwordValue, setPasswordValue] = useState<string>('')
  const [creatingAccount, setCreatingAccount] = useState<boolean>(false)
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
  const [messageBoxType, setMessageBoxType] = useState<BoxTypes>(BoxTypes.HIDE)
  const [messageBoxText, setMessageBoxText] = useState<string>('')

  const showMessageBox = (boxType: BoxTypes, message: string) => {
    // show "MessageBox" component
    setMessageBoxText(message)
    setMessageBoxType(boxType)

    // dismiss "MessageBox" component
    setTimeout(() => {
      setMessageBoxType(BoxTypes.HIDE)
    }, 4000)
  }

  const navigateToUserPage = () => {
    router.push(Pages.USER)
  }

  const handleAuthenticationError = (authError: AuthError) => {
    const { code } = authError
    switch (code) {
      case 'auth/email-already-in-use':
        showMessageBox(BoxTypes.ERROR, 'This email is already in use.')
        break
      case 'auth/invalid-email':
        showMessageBox(BoxTypes.ERROR, 'This email is invalid.')
        break
      case 'auth/user-not-found':
        showMessageBox(
          BoxTypes.ERROR,
          'This email is not registered, please create a new account.'
        )
        break
      case 'auth/wrong-password':
        showMessageBox(BoxTypes.ERROR, 'The password is invalid.')
        break
      default:
        showMessageBox(BoxTypes.ERROR, 'Error while authenticating.')
    }
  }

  const signIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    await signInWithEmailAndPasswordProvider(
      emailValue,
      passwordValue,
      navigateToUserPage,
      handleAuthenticationError
    )
  }

  const signInWithGoogle = async () => {
    await signInWithGoogleProvider(navigateToUserPage, () => {})
  }

  const signUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (typeof recaptchaToken === 'string') {
      await signUpWithEmailAndPasswordProvider(
        emailValue,
        passwordValue,
        navigateToUserPage,
        handleAuthenticationError
      )
    } else {
      showMessageBox(BoxTypes.ERROR, 'Please confirm the reCAPTCHA to sign up')
    }
  }

  const isValidEmail: boolean =
    /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(emailValue)

  const resetPassword = async () => {
    if (isValidEmail) {
      await requestPasswordReset(
        emailValue,
        () => {
          showMessageBox(
            BoxTypes.PASSWORD,
            'An email has been sent to you, please check your inbox to reset your password'
          )
        },
        handleAuthenticationError
      )
    }
  }

  return (
    <FormContainer onSubmit={!creatingAccount ? signIn : signUp}>
      <Title size={45} />
      <LogoContent>
        <Image
          src={LinekerLogo}
          alt={'Lineker Logo'}
          width={180}
          height={180}
          placeholder={'blur'}
        />
      </LogoContent>
      <Description>Access links between your devices</Description>
      <Input
        required
        placeholder={'Email address'}
        type={'email'}
        autoComplete={'email'}
        value={emailValue}
        onChange={({ target }) => {
          setEmailValue(target.value)
        }}
        data-cy={'email-input'}
      />
      {!creatingAccount ? (
        <Input
          required
          placeholder={'Password'}
          type={'password'}
          autoComplete={'current-password'}
          title={'The password must have 6 or more characters'}
          pattern={'^.{6,}$'}
          value={passwordValue}
          onChange={({ target }) => {
            setPasswordValue(target.value)
          }}
          data-cy={'password-input'}
        />
      ) : (
        <SimpleTextContent>
          <SimpleText enableHover={false}>
            The password must have 6 or more characters
          </SimpleText>
        </SimpleTextContent>
      )}
      {!creatingAccount ? (
        <SimpleTextContent
          onClick={resetPassword}
          data-cy={'forgot-password-button'}
        >
          <SimpleText enableHover={true}>Forgot your password?</SimpleText>
        </SimpleTextContent>
      ) : (
        <Input
          required
          placeholder={'Password'}
          type={'password'}
          autoComplete={'new-password'}
          title={'The password must have 6 or more characters'}
          pattern={'^.{6,}$'}
          value={passwordValue}
          onChange={({ target }) => {
            setPasswordValue(target.value)
          }}
          data-cy={'password-input'}
        />
      )}
      {!creatingAccount ? null : (
        <ReCAPTCHAContent>
          <ReCAPTCHA
            sitekey={process.env.RECAPTCHA_SITE_KEY!}
            onChange={token => {
              setRecaptchaToken(token)
            }}
          />
        </ReCAPTCHAContent>
      )}
      <LoginButton type={'submit'} data-cy={'login-button'}>
        <LoginButtonText>
          {!creatingAccount ? 'Sign in' : 'Sign up'}
        </LoginButtonText>
      </LoginButton>
      <GoogleLoginButton onClick={signInWithGoogle}>
        <GoogleLoginButtonText>Sign in with Google</GoogleLoginButtonText>
      </GoogleLoginButton>
      <SimpleText
        enableHover={true}
        onClick={() => {
          setCreatingAccount(!creatingAccount)
        }}
        data-cy={'create-account-switch'}
      >
        {!creatingAccount
          ? "Don't have an account? Do it now!"
          : 'Already have an account? So sign-in!'}
      </SimpleText>
      <MessageBox boxType={messageBoxType} message={messageBoxText} />
    </FormContainer>
  )
}

export default Form
