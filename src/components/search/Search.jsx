import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import posed from 'react-pose'

import Api from '../api/Api'
import { ReactComponent as MapIcon } from '../icons/stateMap.svg'
import './Search.scss'

const propTypes = {
  homePressed: PropTypes.func.isRequired,
  searchPressed: PropTypes.func.isRequired,
}
const WrapperDiv = posed.div({
  pressable: true,
  init: { scale: 1 },
  press: { scale: 0.6 },
})

class Search extends React.Component {
  state = { open: false }

  handleSearch(inputText) {
    Api.getSearchData(this.searchCallback, inputText)
    this.setState({ waiting: true })
    console.log('input', inputText)
  }

  searchCallback(res) {
    console.log('res', res);
    this.setState({ waiting: false })
  }

  render() {
    const { homePressed } = this.props

    const placeholder = 'Pesquise Municípios, Prédios e Órgãos'
    return (
      <div className="Search-container">
        <div className="Search-view">
          <div className="Search-button">
            <WrapperDiv>
              <MapIcon onClick={homePressed} />
            </WrapperDiv>
          </div>
          <input
            onChange={event => this.setState({ query: event.target.value })}
            className="Search-input"
            placeholder={placeholder}
            onFocus={() => this.setState({ open: true })}
          />
          <div className="Search-button">
            <WrapperDiv>
              <FontAwesomeIcon
                className="Search-icon"
                icon={faSearch}
                onClick={() => this.handleSearch(this.state.query)}
              />
            </WrapperDiv>
          </div>
        </div>
      </div>
    )
  }
}
Search.propTypes = propTypes

export default Search
