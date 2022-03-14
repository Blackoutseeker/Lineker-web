import { defaultAuth } from '@utils/firebaseClient'
import {
  UserCredential,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  AuthError
} from 'firebase/auth'
import { addNewUserIntoDatabase } from '@database/user'

export const signInWithEmailAndPasswordProvider = async (
  email: string,
  password: string,
  onSuccess?: () => Promise<void> | void,
  onError?: (authError: AuthError) => Promise<void> | void
) => {
  await signInWithEmailAndPassword(defaultAuth, email, password)
    .then(onSuccess)
    .catch(onError)
}

export const signInWithGoogleProvider = async (
  onSuccess?: () => Promise<void> | void,
  onError?: () => Promise<void> | void
) => {
  const googleAuthProvider = new GoogleAuthProvider()
  await signInWithPopup(defaultAuth, googleAuthProvider)
    .then((userCredential: UserCredential) => {
      const { user } = userCredential
      if (user.email) {
        addNewUserIntoDatabase(user.uid, user.email, onSuccess, onError)
      }
    })
    .catch(onError)
}

export const signUpWithEmailAndPasswordProvider = async (
  email: string,
  password: string,
  onSuccess?: () => Promise<void> | void,
  onError?: (authError: AuthError) => Promise<void> | void
) => {
  await createUserWithEmailAndPassword(defaultAuth, email, password)
    .then((userCredential: UserCredential) => {
      const { user } = userCredential
      if (user.email) {
        addNewUserIntoDatabase(user.uid, user.email, onSuccess)
      }
    })
    .catch(onError)
}

export const requestPasswordReset = async (
  email: string,
  onSuccess?: () => Promise<void> | void,
  onError?: (authError: AuthError) => Promise<void> | void
) => {
  await sendPasswordResetEmail(defaultAuth, email)
    .then(onSuccess)
    .catch(onError)
}
