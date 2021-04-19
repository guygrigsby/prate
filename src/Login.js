import React from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from './use-auth.js'

const Login = ({ onError }) => {
  const [user, setUser] = React.useState('')
  let history = useHistory()
  let auth = useAuth()

  const handleLogin = (e, user) => {
    e.preventDefault()
    e.stopPropagation()
    if (user === '') {
      onError('User cannot be empty')
      return
    }
    auth.signin(user, () => {
      history.push('/')
    })
  }

  return (
    <div className="m-2">
      <form onSubmit={(e) => handleLogin(e, user)}>
        <label className="form-label">Name</label>
        <input
          className="form-control"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          className="mt-2 float-end btn btn-dark"
          type="submit"
          value="Start Prating"
        />
      </form>
    </div>
  )
}

export default Login
