import React from 'react'
import PropTypes from 'prop-types'

import './recents.scss'
import Card from './card'

const propTypes = {}

const recents = (props) => {
  return (
    <div className="Recents-container">
      <div className="Recents-title">RECENTES</div>
      <div className="Recents-content">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  )
}

recents.propTypes = propTypes
export default recents
