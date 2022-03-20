import { defaultDatabase } from '@utils/firebaseClient'
import { ref, get, set, remove, onValue, off } from 'firebase/database'
import HistoryItem from '@models/historyItem'

export const getAllHistoryItemsFromDatabase = async (
  uid: string
): Promise<HistoryItem[] | null> => {
  const historyDatabaseRef = ref(defaultDatabase, `users/${uid}/history`)
  return await get(historyDatabaseRef).then(snapshot => {
    const snapshotIsNotEmpty =
      snapshot.val() !== null && snapshot.val() !== undefined
    if (snapshotIsNotEmpty) {
      const historyItems: HistoryItem[] = Object.values(snapshot.val())
      return historyItems
    }
    return null
  })
}

export const addNewHistoryItemIntoDatabase = async (
  uid: string,
  historyItem: HistoryItem,
  onSuccess?: () => Promise<void> | void,
  onError?: () => Promise<void> | void
): Promise<void> => {
  const historyItemDatabaseRef = ref(
    defaultDatabase,
    `users/${uid}/history/${historyItem.datetime}`
  )
  await set(historyItemDatabaseRef, historyItem).then(onSuccess).catch(onError)
}

export const removeHistoryItemFromDatabase = async (
  uid: string,
  datetime: string,
  onSuccess?: () => Promise<void> | void,
  onError?: () => Promise<void> | void
): Promise<void> => {
  const historyItemDatabaseRef = ref(
    defaultDatabase,
    `users/${uid}/history/${datetime}`
  )
  await remove(historyItemDatabaseRef).then(onSuccess).catch(onError)
}

export const removeAllHistoryFromDatabase = async (
  uid: string,
  onSuccess?: () => Promise<void> | void,
  onError?: () => Promise<void> | void
): Promise<void> => {
  const historyDatabaseRef = ref(defaultDatabase, `users/${uid}/history`)
  await remove(historyDatabaseRef).then(onSuccess).catch(onError)
}

export const databaseHistoryItemsListener = (
  databaseRef: string,
  setHistoryItems: (historyItems: HistoryItem[] | null) => void
) => {
  const databaseListenerRef = ref(defaultDatabase, databaseRef)

  return {
    listen: () =>
      onValue(databaseListenerRef, snapshot => {
        const snapshotIsNotEmpty =
          snapshot.val() !== null && snapshot.val() !== undefined
        if (snapshotIsNotEmpty) {
          const historyItems: HistoryItem[] = Object.values(snapshot.val())
          setHistoryItems(historyItems)
        } else {
          setHistoryItems(null)
        }
      }),
    unlisten: () => off(databaseListenerRef)
  }
}
