import { defaultDatabase } from '@utils/firebaseClient'
import { ref, set, onValue, off, remove } from 'firebase/database'
import FilterItem from '@models/filterItem'

export const addNewFilterIntoDatabase = async (
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

export const databaseFiltersListener = (
  databaseRef: string,
  setFilters: (filters: FilterItem[]) => void
) => {
  const databaseListenerRef = ref(defaultDatabase, databaseRef)

  return {
    listen: () =>
      onValue(databaseListenerRef, snapshot => {
        const snapshotIsNotEmpty =
          snapshot.val() !== null && snapshot.val() !== undefined
        if (snapshotIsNotEmpty) {
          const linkItems: FilterItem[] = Object.values(snapshot.val())
          setFilters(linkItems)
        } else {
          const defaultFilter: FilterItem = { filter: 'Default' }
          setFilters([defaultFilter])
        }
      }),
    unlisten: () => off(databaseListenerRef)
  }
}

const removeLinksFromDatabase = async (
  uid: string,
  filter: string
): Promise<void> => {
  const linksDatabaseRef = ref(defaultDatabase, `users/${uid}/links/${filter}`)
  await remove(linksDatabaseRef)
}

export const removeFilterFromDatabase = async (
  uid: string,
  filter: string,
  onSuccess?: () => Promise<void> | void,
  onError?: () => Promise<void> | void
): Promise<void> => {
  await removeLinksFromDatabase(uid, filter)
    .then(async () => {
      const filterDatabaseRef = ref(
        defaultDatabase,
        `users/${uid}/filters/${filter}`
      )
      remove(filterDatabaseRef).then(onSuccess).catch(onError)
    })
    .catch(onError)
}
