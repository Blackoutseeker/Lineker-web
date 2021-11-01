import { createContext, useState, useEffect, useContext } from 'react'
import firebaseApp from 'firebase/app'
import { setCookie, destroyCookie } from 'nookies'
import firebaseClient from '@utils/firebaseClient'

const AuthContext = createContext<{ user: firebaseApp.User | null }>({
  user: null
})

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<firebaseApp.User | null>(null)

  const saveTokenByCookie = (token: string) => {
    setCookie(undefined, 'token', token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30 // 30 days
    })
  }

  const deleteTokenFromCookie = () => {
    destroyCookie(undefined, 'token')
  }

  useEffect(() => {
    return firebaseClient.auth().onIdTokenChanged(async user => {
      if (!user) {
        setUser(null)
        deleteTokenFromCookie()
      } else {
        await user.getIdToken().then(token => {
          setUser(user)
          saveTokenByCookie(token)
        })
      }
    })
  }, [])

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export default useAuth
