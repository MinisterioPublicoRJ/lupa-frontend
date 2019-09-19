import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import posed from 'react-pose'

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

function search({ homePressed, searchPressed }) {
  const text = 'Pesquise Municípios, Prédios e Órgãos'
  return (
    <div className="Search-container">
      <div className="Search-view">
        <div className="Search-button">
          <WrapperDiv>
            <MapIcon onClick={homePressed} />
          </WrapperDiv>
        </div>
        <input
          className="Search-input"
          placeholder={text}
          onFocus={() => console.log('look at me!')}
          onBlur={() => console.log('i was blurred')}
        />
        <div className="Search-button">
          <WrapperDiv>
            <FontAwesomeIcon
              className="Search-icon"
              icon={faSearch}
              onClick={() => searchPressed()}
            />
          </WrapperDiv>
        </div>
      </div>
    </div>
  )
}
search.propTypes = propTypes

export default search
