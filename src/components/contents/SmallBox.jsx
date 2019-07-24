import React from 'react'
import PropTypes from 'prop-types'

import './Box.scss'

const propTypes = {
  description: PropTypes.string,
  source: PropTypes.string,
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}
const defaultProps = {
  description: null,
  source: null,
}

const SmallBox = ({ description, source, title, value }) => (
  <div className="box SmallBox">
    <div className="SmallBox-title">{title ? title.toLocaleUpperCase('pt-br') : null}</div>
    <div className="SmallBox-value">{value}</div>
    {description && <div className="SmallBox-description">{description}</div>}
    {source ? <div className="SmallBox--source">{source}</div> : null}
  </div>
)

SmallBox.propTypes = propTypes
SmallBox.defaultProps = defaultProps
export default SmallBox
