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

export default function mainNavigator() {
  return (
    <Router basename="/">
      <Route exact path="/" component={Login} />
      <PrivateRoute path="/:entityType/:entityId" component={Home} />
    </Router>
  )
}
