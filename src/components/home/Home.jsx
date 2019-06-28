import React from 'react';

import './Home.scss';
import Search from '../search/Search';
import Map from '../Map/Map';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { buildings: null };
  }

  handleSearching() {
    console.log('SEARCHING!')
  }

  handleMenu() {
    console.log('Menu')
  }

  render() {
    return (
      <div className="Home-container">
        <Search
          searchPressed={() => this.handleSearching()}
          menuPressed={() => this.handleMenu()}
        />
        <div className="Map-view">
          <Map />
        </div>
        <div className="Home-footer">
          <p>here goes menu and last viewed</p>
        </div>
      </div>
    );
  }
}

export default Home;
