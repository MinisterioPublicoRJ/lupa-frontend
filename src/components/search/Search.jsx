import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import posed from 'react-pose'

import Api from '../api/Api'
import { ReactComponent as MapIcon } from '../icons/stateMap.svg'
import './Search.scss'

const propTypes = {
  homePressed: PropTypes.func.isRequired,
}
/**
 * Just a wrapper to animate the menu buttons so that they shrink
 * when clicked and restore when released
 * @type {[type]}
 */
const WrapperDiv = posed.div({
  pressable: true,
  init: { scale: 1 },
  press: { scale: 0.6 },
})

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.manageSearch = this.manageSearch.bind(this)
    this.searchCallback = this.searchCallback.bind(this)
    this.state = { open: false }
  }

  /**
   * Handles input state and debouncing for the API calls
   * @param  {[event]} event the mouseCick event
   * @return {[void]}
   */
  handleTyping(event) {
    // fisrt, clean all previous timeouts
    if (this.timeout) {
      clearTimeout(this.timeout)
    }

    // now, handle the new input that was typed
    const query = event.target.value
    this.timeout = setTimeout(this.manageSearch, 2000, query)
    this.setState({ query })
  }

  /**
   * Triggers the loading state in the component
   * @param  {[string]} inputText text to be searched
   * @return {[void]}
   */
  manageSearch(inputText) {
    Api.getSearchData(this.searchCallback, inputText)
    this.setState({ waiting: true })
  }

  /**
   * Handles search results and dismisses loading state
   * @param  {[array]} response
   * @return {[void]}
   */
  searchCallback(response) {
    console.log(response)
    this.setState({ waiting: false })
    this.setState({ searchResponse: response })
  }

  /**
   * Updates state and triggers events on closing
   * @return {[void]}
   */
  handleClosing() {
    this.setState({ open: false })
  }

  /**
   * Updates state and triggers events on opening
   * @return {[void]}
   */
  handleOpening() {
    this.setState({ open: true })
  }

  render() {
    const { homePressed } = this.props
    const { query, open } = this.state

    const placeholder = 'Pesquise Municípios, Prédios e Órgãos'
    return (
      <div className="Search-container">
        <div className="Search-view">
          <div className="Search-button">
            <WrapperDiv>
              {open ? (
                <FontAwesomeIcon
                  className="Search-icon"
                  icon={faTimes}
                  onClick={() => this.handleClosing()}
                />
              ) : (
                <MapIcon onClick={homePressed} />
              )}
            </WrapperDiv>
          </div>
          <input
            onChange={event => this.handleTyping(event)}
            className="Search-input"
            placeholder={placeholder}
            onFocus={() => this.setState({ open: true })}
          />
          <div className="Search-button">
            <WrapperDiv>
              <FontAwesomeIcon
                className="Search-icon"
                icon={faSearch}
                onClick={() => this.manageSearch(query)}
              />
            </WrapperDiv>
          </div>
          {
            this.state.open && !this.state.waiting && this.state.searchResponse ?
              <div className="search-result">
                <ul className="search-result-list">
                  {
                    this.state.searchResponse ?
                      this.state.searchResponse.map((response, index) => {
                        return <li key={index} className="search-result-list-item">
                          {response.properties.name}
                          <small className="search-result-list-item-city">
                            {response.properties.city}
                          </small>
                        </li>
                      })
                    : null
                  }
                </ul>
              </div>
            : null
          }
        </div>
      </div>
    )
  }
}
Search.propTypes = propTypes

export default Search
