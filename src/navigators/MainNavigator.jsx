import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import Home from '../components/home/Home'
import Login from '../components/login/Login'

const isLoggedIn = true

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest}
    render={props => isLoggedIn
      ? <Component {...props} />
    : <Redirect to={{ pathname: '/' }} />
    }
  />
)

export default function mainNavigator() {
  return (
    <Router>
      <Route exact path="/" component={Login} />
      <PrivateRoute exact path="/home" component={Home} />
    </Router>
  )
}
