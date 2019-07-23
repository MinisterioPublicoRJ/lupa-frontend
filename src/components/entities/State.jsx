import React from 'react'
import PropTypes from 'prop-types'

import './State.scss'
import Contents from '../contents/Contents'
import Map from '../map/Map'
import Filter from '../filter/Filter'
import FullScreenLoading from '../utils/FullScreenLoading'
import Api from '../api/Api'

const propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) }).isRequired,
}

class State extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loading: true, activeFilter: 'CONVERGENCIA' }
    this.checkContent = this.checkContent.bind(this)
    this.renderBox = this.renderBox.bind(this)
  }

  componentDidMount() {
    const { loading } = this.state
    const { match } = this.props
    if (loading) {
      this.loadStateData(match.params.id)
    }
  }

  /**
   * Controls the loading and loads new state data
   * @return {void}
   */
  loadStateData() {
    Api.getEntityData(this.checkContent, 'EST', '33')
  }

  /**
   * Callback from the getEntityData function
   * Handles database response, updating the state with the error
   * or new data and loading the entity's boxes if they exist
   * @param {Object} entityResponse whatever comer from the database
   * @param {Object} entityResponse.data_list[] Objects to load data and display in boxes
   * @param {Number} entityResponse.data_list[].id Data ID to load
   * @param {String} entityResponse.domain_id UUID of entity
   * @param {String} entityResponse.entity_type Entity type
   * @param {String} entityResponse.exibition_field Name to use as exibition
   * @param {Object} entityResponse.geojson GeoJSON of entity to be displayed on the map
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
    this.setState({
      loading: false,
      content: loadingBoxes,
      geojson: entityResponse.geojson,
      name: entityResponse.exibition_field,
    })

    this.loadBoxes(entityResponse.data_list)
  }

  /**
   * Creates promises to get the boxes' content from the database
   * @param  {array} dataList Array of jsons with the boxes id's
   * @return {void}
   */
  loadBoxes(dataList) {
    dataList.forEach(item => Api.getBoxData(this.renderBox, 'EST', '33', item.id))
  }

  /**
   * NOT FOR VERSION ONE
   * Changes the current filter applied to the content
   * @param  {string} filter filter name
   * @return {void}
   */
  handleFiltering(filter) {
    this.setState({ activeFilter: filter })
  }

  /**
   * Callback from the getBoxData function
   * Receives the box info after the promise is resolved
   * and updates the state with the new data
   * @param  {json} updatedBox actual box content
   * @param  {string} boxId    id (only comes if the request fails)
   * @return {void}
   */
  renderBox(updatedBox, boxId) {
    const { content } = this.state
    const newBox = boxId ? { id: boxId, data_type: 'error' } : updatedBox
    const newContent = content.map((box) => {
      if (box.id === newBox.id) return newBox

      return box
    })

    this.setState({ content: newContent })
  }

  render() {
    const {
      loading, activeFilter, content, error, geojson, name,
    } = this.state

    if (loading) return <FullScreenLoading />
    return (
      <div className="Entity-container">
        <div className="Main-container">
          {geojson ? <Map geojson={geojson} /> : null}
          <hr />
          <div className="Name-container">{name}</div>
          <div className="Name-helper" />
          <Contents error={error} boxes={content} />
        </div>
        <Filter active={activeFilter} filterClicked={filter => this.handleFiltering(filter)} />
      </div>
    )
  }
}

State.propTypes = propTypes
export default State
