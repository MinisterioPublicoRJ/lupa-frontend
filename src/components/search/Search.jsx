import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import { ReactComponent as MapIcon } from '../icons/stateMap.svg'
import './Search.scss'

const propTypes = {
  homePressed: PropTypes.func.isRequired,
  searchPressed: PropTypes.func.isRequired,
}

function search(props) {
  const text = 'Pesquise Municípios, Prédios e Órgãos'
  return (
    <div className="Search-container">
      <div className="Search-view">
        <div className="Search-button">
          <MapIcon />
        </div>
        <input
          className="Search-input"
          placeholder={text}
          onFocus={() => console.log('look at me!')}
          onBlur={() => console.log('i was blurred')}
        />
        <div className="Search-button">
          <FontAwesomeIcon
            className="Search-icon"
            icon={faSearch}
            onClick={() => props.searchPressed()}
          />
        </div>
      </div>
      {/*<div className="Search-body">
        i am here
      </div>*/}
    </div>
  )
}
search.propTypes = propTypes

export default search
