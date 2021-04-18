import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { useAuth } from './use-auth.js'
import Login from './Login.js'
import ChatWindow from './ChatWindow.js'
import Alert from './components/Alert.js'
import { css } from 'pretty-lights'
import './App.css'

const container = css`
  max-width: 800px;
  padding: 2em;
`

const App = () => {
  const [err, setErr] = React.useState(null)
  return (
    <div className={container}>
      {err ? <Alert msg={err} onClose={() => setErr(null)} /> : null}
      <Router>
        <Switch>
          <PrivateRoute exact path="/">
            <ChatWindow />
          </PrivateRoute>
          <Route path="/login">
            <Login onError={(err) => setErr(err)} />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}
// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  let auth = useAuth()
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
            }}
          />
        )
      }
    />
  )
}
export default App
