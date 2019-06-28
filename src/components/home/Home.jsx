import React from 'react'
import MapView from '../map/Map'
import Search from '../search/Search'
import './Home.scss';

function App() {
  return (
    <div className="Home-container">
      <Search />
      <MapView />
      <div className="Home-footer">
        <p>here goes menu and last viewed</p>
      </div>
    </div>
  );
}

export default App;
