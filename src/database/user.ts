import { defaultDatabase } from '@utils/firebaseClient'
import { ref, get, set } from 'firebase/database'

const checkUserExists = async (uid: string): Promise<boolean> => {
  const userRef = ref(defaultDatabase, `users/${uid}`)
  const userSnapshot = await get(userRef)
  return userSnapshot.val() !== null
}

export const addNewUserIntoDatabase = async (
  uid: string,
  email: string,
  onSuccess?: () => Promise<void> | void,
  onError?: () => Promise<void> | void
) => {
  const userRef = ref(defaultDatabase, `users/${uid}`)
  const isUserNotStored = !(await checkUserExists(uid))
  if (isUserNotStored) {
    await set(userRef, {
      email,
      filters: {
        Default: {
          filter: 'Default'
        }
      }
    })
      .then(onSuccess)
      .catch(onError)
  } else {
    onSuccess?.()
  }
}
