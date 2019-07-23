import React from 'react'

import './County.scss'
import Contents from '../contents/Contents'
import Map from '../map/Map'
import Filter from '../filter/Filter'
import FullScreenLoading from '../utils/FullScreenLoading'
import Api from '../api/Api'

class County extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loading: true, activeFilter: 'CONVERGENCIA' }
    this.checkContent = this.checkContent.bind(this)
    this.renderBox = this.renderBox.bind(this)
  }

  componentDidMount() {
    const { loading } = this.state
    const { id } = this.props.match.params
    if (loading) {
      this.loadCountyData(id)
    }
  }

  componentDidUpdate(prevProps) {
    const prevId = prevProps.match.params.id
    const currentId = this.props.match.params.id
    if (currentId !== prevId) {
      this.loadCountyData(currentId)
    }
  }

  loadCountyData(id) {
    if (!this.state.loading) {
      this.setState({ loading: true })
    }
    Api.getEntityData(this.checkContent, 'MUN', id)
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
    this.setState({ loading: false, content: loadingBoxes, geojson: entityResponse.geojson })

    this.loadBoxes(entityResponse.data_list)
  }

  /**
   * Creates promises to get the boxes' content from the database
   * @param  {array} dataList Array of jsons with the boxes id's
   * @return {void}
   */
  loadBoxes(dataList) {
    const { id } = this.props.match.params
    dataList.forEach(item => Api.getBoxData(this.renderBox, 'MUN', id, item.id))
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
   * @return {void}
   */
  renderBox(updatedBox) {
    const { content } = this.state
    const newContent = content.map((box) => {
      if (box.id === updatedBox.id) return updatedBox

      return box
    })

    this.setState({ content: newContent })
  }

  render() {
    const {
      loading, activeFilter, content, error, geojson,
    } = this.state

    if (loading) return <FullScreenLoading />
    return (
      <div className="Entity-container">
        <div className="Main-container">
          {geojson ? <Map geojson={geojson} /> : null}
          <hr />
          <div onClick={() => this.props.history.push('/municipio/330030')}>
            Barra do Piraí
          </div>
          <Contents error={error} boxes={content} />
        </div>
        <Filter active={activeFilter} filterClicked={filter => this.handleFiltering(filter)} />
      </div>
    )
  }
}

export default County
