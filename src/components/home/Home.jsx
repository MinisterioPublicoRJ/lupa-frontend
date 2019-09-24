import React from 'react'
import PropTypes from 'prop-types'

import './Home.scss'
import Theme from '../contents/Theme'
import Map from '../map/Map'
import EntityError from '../utils/EntityError'
import FullScreenLoading from '../utils/FullScreenLoading'
import Api from '../api/Api'
import Menu from '../menu/Menu'
import Search from '../search/Search'

const propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      entityType: PropTypes.string,
      entityId: PropTypes.string,
    }),
  }).isRequired,
}

class Home extends React.Component {
  storageListener = null

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      menuOpen: false,
      isLogged: !!localStorage.getItem('token'),
    }
    this.checkContent = this.checkContent.bind(this)
    this.selectSearchItemCallback = this.selectSearchItemCallback.bind(this)
  }

  componentDidMount() {
    const { loading } = this.state
    const { match } = this.props

    if (loading) {
      this.loadEntityData(match.params.entityType, match.params.entityId)
    }
  }

  /**
   * Checks if there was a change in the navigation params
   * and updates the component with new data
   */
  componentDidUpdate(prevProps) {
    const prevType = prevProps.match.params.entityType
    const prevId = prevProps.match.params.entityId
    const { match } = this.props
    const currentType = match.params.entityType
    const currentId = match.params.entityId
    if (currentId !== prevId || currentType !== prevType) {
      this.loadEntityData(currentType, currentId)
    }
  }

  /**
   * Controls the loading and loads new entity data
   * @param  {string} entityType
   * @param  {string} entityId
   * @return {void}
   */
  loadEntityData(entityType, entityId) {
    const { loading } = this.state
    if (!loading) {
      this.setState({ loading: true })
    }
    Api.getEntityData(this.checkContent, entityType, entityId)
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
    if (!entityResponse.theme_list) {
      this.setState({
        loading: false,
        error: entityResponse,
        name: null,
        themes: null,
        title: 'Erro',
      })
      return
    }

    this.setState({
      loading: false,
      error: null,
      themes: entityResponse.theme_list,
      geojson: entityResponse.geojson,
      name: entityResponse.exibition_field,
      title: entityResponse.entity_type,
    })
  }

  handleNavigateToEntity(entityType, entityId) {
    const { history } = this.props
    history.push(`/${entityType}/${entityId}`)
  }

  navigateToLogin() {
    console.log('login')
    const { history } = this.props
    history.push('/login')
  }

  selectSearchItemCallback(response) {
    this.props.history.push(`/${response.abreviation}/${response.entity_id}`)
    console.log("response: ", response)
  }

  handleLogout() {
    localStorage.removeItem('token')
    this.setState({ isLogged: false })
  }

  render() {
    const {
      loading, menuOpen, error, geojson, name, title, themes, isLogged,
    } = this.state
    const { match } = this.props
    const { entityType, entityId } = match.params

    if (loading) return <FullScreenLoading />

    return (
      <div className="Entity-container">
        <div className="Main-container">
          {!error ? (
            <Search
              homePressed={() => this.handleNavigateToEntity('EST', '33')}
              searchCallback={response => this.selectSearchItemCallback(response)}
            />
          ) : null}
          {geojson ? (
            <Map
              geojsonArray={geojson}
              navigateToEntity={(eType, eId) => this.handleNavigateToEntity(eType, eId)}
            />
          ) : null}
          <div className="Name-container">{title.toLocaleUpperCase()}</div>
          <div className="Name-helper" />
          <div className="Entity-title-container">{name}</div>

          <div className="contents">
            {error ? <EntityError errorInfo={error} /> : null}
            {themes
              ? themes.map((item, i) => (
                <Theme
                  key={`item.tema${i}`}
                  content={item.data_list}
                  color={item.cor}
                  name={item.tema}
                  entityType={entityType}
                  entityId={entityId}
                  navigateToEntity={(eType, eId) => this.handleNavigateToEntity(eType, eId)}
                />
              ))
              : null}
            <Menu
              isLogged={isLogged}
              isOpen={menuOpen}
              toggle={newState => this.setState({ menuOpen: newState })}
              onLogin={() => this.navigateToLogin()}
              onLogout={() => this.handleLogout()}
              navigateToEntity={() => this.handleNavigateToEntity('EST', '33')}
            />
          </div>
        </div>
      </div>
    )
  }
}

Home.propTypes = propTypes
export default Home
