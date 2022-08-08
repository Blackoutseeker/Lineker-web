import { defaultDatabase } from '@utils/firebaseClient'
import { ref, set, remove, onValue, off } from 'firebase/database'
import LinkItem from '@models/linkItem'

const createFilterIfNotExists = async (
  uid: string,
  filter: string,
  onSuccess?: () => Promise<void> | void,
  onError?: () => Promise<void> | void
): Promise<void> => {
  const filterDatabaseRef = ref(
    defaultDatabase,
    `users/${uid}/filters/${filter}`
  )
  await set(filterDatabaseRef, {
    filter
  })
    .then(onSuccess)
    .catch(onError)
}

export const addNewLinkToDatabase = async (
  uid: string,
  filter: string,
  linkItem: LinkItem,
  onSuccess?: () => Promise<void> | void,
  onError?: () => Promise<void> | void
): Promise<void> => {
  await createFilterIfNotExists(uid, filter)
  const linkDatabaseRef = ref(
    defaultDatabase,
    `users/${uid}/links/${filter}/${linkItem.datetime}`
  )
  await set(linkDatabaseRef, linkItem).then(onSuccess).catch(onError)
}

export const removeLinkFromDatabase = async (
  uid: string,
  filter: string,
  linkDatetime: string,
  onSuccess?: () => Promise<void> | void,
  onError?: () => Promise<void> | void
): Promise<void> => {
  const linkItemDatabaseRef = ref(
    defaultDatabase,
    `users/${uid}/links/${filter}/${linkDatetime}`
  )
  await remove(linkItemDatabaseRef).then(onSuccess).catch(onError)
}

export const databaseLinksListener = (
  databaseRef: string,
  setLinkItems: (linkItems: LinkItem[] | null) => void
) => {
  const databaseListenerRef = ref(defaultDatabase, databaseRef)

  return {
    listen: () =>
      onValue(databaseListenerRef, snapshot => {
        const snapshotIsNotEmpty =
          snapshot.val() !== null && snapshot.val() !== undefined
        if (snapshotIsNotEmpty) {
          const linkItems: LinkItem[] = Object.values(snapshot.val())
          setLinkItems(linkItems)
        } else {
          setLinkItems(null)
        }
      }),
    unlisten: () => off(databaseListenerRef)
  }
}
