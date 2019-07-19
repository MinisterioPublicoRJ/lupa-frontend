import React from 'react'
import Div100vh from 'react-div-100vh'

import './Home.scss'
import Contents from '../contents/Contents'
import Search from '../search/Search'
import Map from '../map/Map'
import Filter from '../filter/Filter'
import FullScreenLoading from '../utils/FullScreenLoading'
import Api from '../api/Api'
// import Recents from '../recents/Recents'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loading: true, activeFilter: 'CONVERGENCIA' }
    this.checkContent = this.checkContent.bind(this)
    this.renderBox = this.renderBox.bind(this)
  }

  componentDidMount() {
    const { loading } = this.state
    if (loading) {
      Api.getEntityData(this.checkContent, 'MUN', '330455')
    }
  }

  /**
   * Callback from the getEntityData function
   * Handles database response, updating the state with the error
   * or new data and loading the entity's boxes if they exist
   * @param  {json || string} entityResponse whatever comer from the database
   * @return {void}
   */
  checkContent(entityResponse) {
    if (!entityResponse.data_list) {
      this.setState({ loading: false, error: entityResponse })
      return
    }

    const loadingBoxes = entityResponse.data_list.map(info => ({
      id: info.id,
      data_type: 'loading',
    }))
    this.setState({ loading: false, content: loadingBoxes })

    this.loadBoxes(entityResponse.data_list)
  }

  /**
   * Creates promises to get the boxes' content from the database
   * @param  {array} dataList Array of jsons with the boxes id's
   * @return {void}
   */
  loadBoxes(dataList) {
    dataList.forEach(item => Api.getBoxData(this.renderBox, 'MUN', '330455', item.id))
  }

  handleSearching() {
    console.log('SEARCHING!')
  }

  // NOT FOR VERSION ONE
  // handleMenu() {
  //   console.log('Menu')
  // }

  /**
   * Changes the current filter applied to the content
   * NOT FOR VERSION ONE
   * @param  {string} filter filter name
   * @return {void}
   */
  handleFiltering(filter) {
    this.setState({ activeFilter: filter })
  }

  renderBox(updatedBox) {
    const { content } = this.state
    const newContent = content.map((box) => {
      if (box.id === updatedBox.id) return updatedBox

      return box
    })
    console.log(newContent);
    this.setState({ content: newContent })
  }

  render() {
    const {
      loading, activeFilter, content, error,
    } = this.state

    if (loading) return <FullScreenLoading />
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
          <Contents error={error} boxes={content} />
        </div>
        <Filter active={activeFilter} filterClicked={filter => this.handleFiltering(filter)} />
      </Div100vh>
    )
  }
}

export default Home
