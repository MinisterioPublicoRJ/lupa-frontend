import React from 'react'
// import PropTypes from 'prop-types'

import './Recents.scss'
import Card from './Card'

const propTypes = {}

const Recents = () => (
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

Recents.propTypes = propTypes
export default Recents
