import { getApps, initializeApp } from 'firebase/app'
import { Auth, getAuth } from 'firebase/auth'
import { Database, getDatabase } from 'firebase/database'

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

const appIsNotInitialized: boolean = !getApps().length

if (appIsNotInitialized) {
  initializeApp(config)
}

export const defaultAuth: Auth = getAuth()
export const defaultDatabase: Database = getDatabase()
