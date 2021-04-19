import React, { useContext, createContext, useState } from 'react'
import { v4 as uuid } from 'uuid'
/** For more details on
 * `authContext`, `ProvideAuth`, `useAuth` and `useProvideAuth`
 * refer to: https://usehooks.com/useAuth/
 */
const authContext = createContext()

const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
  return useContext(authContext)
}

export const useFakeAuth = () => {
  return {
    user: 'testuser',
    id: 'super-leaf-8',
    signin: (user, cn) => console.log('signin fake user'),
    signout: () => console.log('signout fake user'),
  }
}

const nameOnlyAuth = {
  isAuthenticated: false,
  signin(cb) {
    nameOnlyAuth.isAuthenticated = true
  },
  signout(cb) {
    nameOnlyAuth.isAuthenticated = false
  },
}

export function useProvideAuth() {
  const [user, setUser] = useState(null)
  const [id, setId] = useState(null)

  const signin = (user, cb) => {
    return nameOnlyAuth.signin(() => {
      setUser(user)
      setId(uuid())
      cb()
    })
  }

  const signout = (cb) => {
    return nameOnlyAuth.signout(() => {
      setUser(null)
      cb()
    })
  }

  return {
    user,
    id,
    signin,
    signout,
  }
}

export default ProvideAuth
