import React from 'react'
import { HashRouter as Router, Route, Redirect } from 'react-router-dom'

import Home from '../components/home/Home'
import Login from '../components/login/Login'
import County from '../components/entities/County'
import State from '../components/entities/State'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (localStorage.getItem('token') ? <Component {...props} /> : <Redirect to={{ pathname: '/' }} />)
    }
  />
)

export default function mainNavigator() {
  return (
    <Router basename="/">
      <Route exact path="/" component={Login} />
      <PrivateRoute path="/home/:name" component={Home} />
      <PrivateRoute path="/municipio/:id" component={County} />
      <PrivateRoute path="/estado" component={State} />
    </Router>
  )
}
