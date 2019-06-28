import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from '../components/home/Home';
import Login from '../components/login/Login';

export default function mainNavigator() {
  return (
    <Router>
      <Route exact path="/" component={Login} />
      <Route exact path="/home" component={Home} />
    </Router>
  );
}
