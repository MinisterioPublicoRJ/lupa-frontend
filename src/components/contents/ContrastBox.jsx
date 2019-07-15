import React from 'react'
import PropTypes from 'prop-types'

import './Box.scss'

const propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}

const NumberBox = ({ title, value }) => (
  <div className="box ContrastBox-container">
    <div className="ContrastBox-value">{value}</div>
    <div className="ContrastBox-title">{title.toLocaleUpperCase('pt-br')}</div>
  </div>
)

NumberBox.propTypes = propTypes
export default NumberBox
