import React from 'react'
import Div100vh from 'react-div-100vh'

import './Home.scss'
import Contents from '../contents/Contents'
import Search from '../search/Search'
import Map from '../map/Map'
import Filter from '../filter/Filter'
// import Recents from '../recents/Recents'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = { buildings: null }
  }

  handleSearching() {
    console.log('SEARCHING!')
  }

  handleMenu() {
    console.log('Menu')
  }

  handleFiltering(filter) {
    console.log(filter)
  }

  render() {
    return (
      <Div100vh className="Home-container">
        <Search
          searchPressed={() => this.handleSearching()}
          menuPressed={() => this.handleMenu()}
        />
        <div className="Main-container">
          <Map />
          {/* <Recents /> */}
          <hr />
          <Contents />
        </div>
        <Filter filterClicked={filter => this.handleFiltering(filter)} />
      </Div100vh>
    )
  }
}

export default Home
