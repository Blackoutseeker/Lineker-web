import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

interface IFirebaseConfig {
  apiKey: string
  authDomain: string
  databaseURL: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
}

const firebaseConfig: IFirebaseConfig = {
  apiKey: process.env.API_KEY!,
  authDomain: process.env.AUTH_DOMAIN!,
  databaseURL: process.env.DATABASE_URL!,
  projectId: process.env.PROJECT_ID!,
  storageBucket: process.env.STORAGE_BUCKET!,
  messagingSenderId: process.env.MESSAGING_SENDER_ID!,
  appId: process.env.APP_ID!
}

if (typeof window !== 'undefined' && !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
}

export default firebase
