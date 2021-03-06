import React from 'react'
import { HashRouter as Router, Route, Redirect } from 'react-router-dom'

import Home from '../components/home/Home'
import Login from '../components/login/Login'

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
      <Route path="/:entityType/:entityId" component={Home} />
      <Route exact path="/" render={() => <Redirect to="/EST/33" />} />
      <LoginRoute exact path="/login" component={Login} />
    </Router>
  )
}
