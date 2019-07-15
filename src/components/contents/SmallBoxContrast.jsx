import React from 'react'
import PropTypes from 'prop-types'

import './Box.scss'

const propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}

const SmallBoxContrast = ({ title, value }) => (
  <div className="box SmallBoxContrast-container">
    <div className="SmallBoxContrast-value">{value}</div>
    <div className="SmallBoxContrast-title">{title.toLocaleUpperCase('pt-br')}</div>
  </div>
)

SmallBoxContrast.propTypes = propTypes
export default SmallBoxContrast
