import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { useAuth, useFakeAuth } from './use-auth.js'
import Login from './Login.js'
import ChatWindow from './ChatWindow.js'
import Alert from './components/Alert.js'
import './App.css'

const App = () => {
  const [err, setErr] = React.useState(null)
  const auth = useAuth()
  const fakeAuth = useFakeAuth()
  console.log('auth', auth)
  return (
    <div>
      {err ? <Alert msg={err} onClose={() => setErr(null)} /> : null}
      <Router>
        <Switch>
          <Route path="/test">
            <ChatWindow {...fakeAuth} />
          </Route>
          <PrivateRoute exact path="/">
            <ChatWindow {...auth} />
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
