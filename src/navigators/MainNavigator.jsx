import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from '../components/home/Home';
// import App from '../components/app/App';

export default function mainNavigator() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
    </Router>
  );
}
