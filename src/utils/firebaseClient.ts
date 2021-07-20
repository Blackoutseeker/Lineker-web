import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

interface FirebaseConfig {
  apiKey: string
  authDomain: string
  databaseURL: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
}

const config: FirebaseConfig = {
  apiKey: process.env.API_KEY!,
  authDomain: process.env.AUTH_DOMAIN!,
  databaseURL: process.env.DATABASE_URL!,
  projectId: process.env.PROJECT_ID!,
  storageBucket: process.env.STORAGE_BUCKET!,
  messagingSenderId: process.env.MESSAGING_SENDER_ID!,
  appId: process.env.APP_ID!
}

export default !firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app()
