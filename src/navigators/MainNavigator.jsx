import React from 'react'
import { HashRouter as Router, Route, Redirect } from 'react-router-dom'

import Home from '../components/home/Home'
import Login from '../components/login/Login'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (localStorage.getItem('token') ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: '/', state: { prevUrl: props.location.pathname } }} />
    ))
    }
  />
)

// if the user is already logged, redirects to State
const LoginRoute = ({ component, ...rest }) => (
  <Route
    {...rest}
    render={props => (localStorage.getItem('token') ? (
      <Redirect to={{ pathname: '/EST/33', state: { prevUrl: props.location.pathname } }} />
    ) : (
      <Login {...props} />
    ))
    }
  />
)

export default function mainNavigator() {
  return (
    <Router basename="/">
      <LoginRoute exact path="/" component={Login} />
      <PrivateRoute path="/:entityType/:entityId" component={Home} />
    </Router>
  )
}
