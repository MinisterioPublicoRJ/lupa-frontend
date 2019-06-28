import React from 'react'
import Api from '../Api/Api'
import MapView from '../map/Map'
import Search from '../search/Search'
import './Home.scss';

// mock buildings
const buildingsCallback = data => {

}
Api.buildings(buildingsCallback)

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

export default App
