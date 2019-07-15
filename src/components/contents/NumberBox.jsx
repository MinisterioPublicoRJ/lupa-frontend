import React from 'react'
import PropTypes from 'prop-types'

import './Box.scss'

const propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  description: PropTypes.string,
}
const defaultProps = { description: null }

const NumberBox = ({ title, value, description }) => (
  <div className="box Number-box">
    <div className="Number-box-title">{title.toLocaleUpperCase('pt-br')}</div>
    <div className="Number-box-value">{value}</div>
    {description && <div className="Number-box-description">{description}</div>}
  </div>
)

NumberBox.propTypes = propTypes
NumberBox.defaultProps = defaultProps
export default NumberBox
