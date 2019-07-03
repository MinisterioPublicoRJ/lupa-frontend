import React from 'react'
import Div100vh from 'react-div-100vh'

import './Home.scss'
import Search from '../search/Search'
import Map from '../map/Map'
import Filter from '../filter/filter'
import Recents from '../recents/recents'

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
        <div className="Map-view">
          <Map />
          <Recents />
        </div>
        <div className="Home-footer">
          <Filter filterClicked={filter => this.handleFiltering(filter)} />
        </div>
      </Div100vh>
    )
  }
}

export default Home
