import React from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from './use-auth.js'
import { cx, css } from 'pretty-lights'

const page = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 1em;
  padding: 2px;
`
const lp = css`
  margin-left: 1em;
`
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
    <div className={page}>
      <form onSubmit={(e) => handleLogin(e, user)}>
        <label className={lp}>Name</label>
        <input
          className={lp}
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          className={cx('button', lp)}
          type="submit"
          value="Start Prating"
        />
      </form>
    </div>
  )
}

export default Login
