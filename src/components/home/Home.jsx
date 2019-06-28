import React from 'react';

import './Home.scss';
import Search from '../search/Search';
import Map from '../Map/Map'

function App() {
  return (
    <div className="Home-container">
      <Search />
      <div className="Map-view">
        <Map />
      </div>
      <div className="Home-footer">
        <p>here goes menu and last viewed</p>
      </div>
    </div>
  );
}

export default App;
