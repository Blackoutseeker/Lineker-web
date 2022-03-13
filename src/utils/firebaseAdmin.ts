import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { Auth, getAuth } from 'firebase-admin/auth'

const appIsNotInitialized: boolean = !getApps().length

if (appIsNotInitialized) {
  initializeApp({
    credential: cert({
      privateKey: process.env.PRIVATE_KEY!.replace(/\\n/g, '\n'),
      clientEmail: process.env.CLIENT_EMAIL,
      projectId: process.env.PROJECT_ID
    }),
    databaseURL: process.env.DATABASE_URL
  })
}

export const defaultAuth: Auth = getAuth()
