import { FC, useState } from 'react'
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
import firebase from '@utils/firebaseClient'
import firebaseApp from 'firebase/app'

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
    router.push({
      pathname: '/user',
      query: {
        currentFilter: 'Default'
      }
    })
  }

  const handleInsertUserIntoDatabase = async (uid: string, email: string) => {
    const databaseUsersRef = firebase.database().ref('users')
    await databaseUsersRef
      .once('value', async snapshot => {
        const isUserNotStored = !snapshot.hasChild(uid)
        if (isUserNotStored) {
          await databaseUsersRef.child(uid).set({
            email: email,
            filters: {
              Default: {
                filter: 'Default'
              }
            }
          })
        }
      })
      .catch(({ message }) => {
        showMessageBox(BoxTypes.ERROR, message)
      })
  }

  const handleFirebaseAuthMethodsPromises = async (
    firebaseAuthMethod: Promise<firebaseApp.auth.UserCredential>,
    insertUserIntoDatabase?: boolean
  ) => {
    await firebaseAuthMethod
      .then(async ({ user }) => {
        if (insertUserIntoDatabase) {
          await handleInsertUserIntoDatabase(user!.uid, user!.email!)
        }
        navigateToUserPage()
      })
      .catch(({ message }: { message: string }) => {
        showMessageBox(BoxTypes.ERROR, message)
      })
  }

  const signIn = () => {
    handleFirebaseAuthMethodsPromises(
      firebase.auth().signInWithEmailAndPassword(emailValue, passwordValue)
    )
  }

  const signInWithGoogle = () => {
    const googleAuthProvider = new firebaseApp.auth.GoogleAuthProvider()
    handleFirebaseAuthMethodsPromises(
      firebase.auth().signInWithPopup(googleAuthProvider),
      true
    )
  }

  const signUp = () => {
    if (typeof recaptchaToken === 'string') {
      handleFirebaseAuthMethodsPromises(
        firebase
          .auth()
          .createUserWithEmailAndPassword(emailValue, passwordValue),
        true
      )
    } else {
      showMessageBox(BoxTypes.ERROR, 'Please confirm the reCAPTCHA to sign up')
    }
  }

  const isValidEmail: boolean =
    /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(emailValue)
  const isValidForm: boolean = isValidEmail && passwordValue.length >= 6

  const requestPasswordReset = async () => {
    if (isValidEmail) {
      await firebase
        .auth()
        .sendPasswordResetEmail(emailValue)
        .then(() => {
          showMessageBox(
            BoxTypes.PASSWORD,
            'An email has been sent to you, please check your inbox to reset your password'
          )
        })
        .catch(({ message }: { message: string }) => {
          showMessageBox(BoxTypes.ERROR, message)
        })
    }
  }

  const handleEnterKeyDown = (key: string) => {
    if (key === 'Enter' && isValidForm) {
      if (!creatingAccount) {
        signIn()
      } else {
        signUp()
      }
    }
  }

  const handleLoginButtonDisabledState = (): boolean => {
    if (isValidForm) {
      if (creatingAccount) {
        if (typeof recaptchaToken === 'string') {
          return false
        }
        return true
      }
      return false
    }
    return true
  }

  return (
    <FormContainer>
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
        placeholder={'Email address'}
        type={'email'}
        value={emailValue}
        onKeyDown={({ key }) => handleEnterKeyDown(key)}
        onChange={({ target }) => {
          setEmailValue(target.value)
        }}
        data-cy={'email-input'}
      />
      {!creatingAccount ? (
        <Input
          placeholder={'Password'}
          type={'password'}
          value={passwordValue}
          onKeyDown={({ key }) => handleEnterKeyDown(key)}
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
          onClick={requestPasswordReset}
          data-cy={'forgot-password-button'}
        >
          <SimpleText enableHover={true}>Forgot your password?</SimpleText>
        </SimpleTextContent>
      ) : (
        <Input
          placeholder={'Password'}
          type={'password'}
          value={passwordValue}
          onKeyDown={({ key }) => handleEnterKeyDown(key)}
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
      <LoginButton
        disabled={handleLoginButtonDisabledState()}
        onClick={!creatingAccount ? signIn : signUp}
        data-cy={'login-button'}
      >
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
