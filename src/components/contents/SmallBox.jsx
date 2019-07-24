import React from 'react'
import PropTypes from 'prop-types'

import './Box.scss'

const propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  description: PropTypes.string,
}
const defaultProps = { description: null }

const SmallBox = ({ title, value, description }) => (
  <div className="box SmallBox">
    <div className="SmallBox-title">{title ? title.toLocaleUpperCase('pt-br') : null}</div>
    <div className="SmallBox-value">{value}</div>
    {description && <div className="SmallBox-description">{description}</div>}
  </div>
)

SmallBox.propTypes = propTypes
SmallBox.defaultProps = defaultProps
export default SmallBox
