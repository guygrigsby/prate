import React, { useContext, createContext, useState } from 'react'
/** For more details on
 * `authContext`, `ProvideAuth`, `useAuth` and `useProvideAuth`
 * refer to: https://usehooks.com/useAuth/
 */
const authContext = createContext()

const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth()
  console.log('auth', auth)
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
  return useContext(authContext)
}

const nameOnlyAuth = {
  isAuthenticated: false,
  signin(cb) {
    nameOnlyAuth.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    nameOnlyAuth.isAuthenticated = false
    setTimeout(cb, 100)
  },
}

export function useProvideAuth() {
  const [user, setUser] = useState(null)

  const signin = (user, cb) => {
    return nameOnlyAuth.signin(() => {
      setUser(user)
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
    signin,
    signout,
  }
}

export default ProvideAuth
