import React from 'react'
import PropTypes from 'prop-types'

import './Box.scss'

const propTypes = {
  description: PropTypes.string,
  source: PropTypes.string,
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}
const defaultProps = {
  description: null,
  source: null,
  color: null,
}

const SmallBox = ({
  description, source, title, value, color,
}) => (
  <div className="box SmallBox" style={color && { backgroundColor: color }}>
    <div className="box-title" style={color && { color: 'white' }}>
      {title && title.toLocaleUpperCase('pt-br')}
    </div>
    <div className="box-value" style={color && { color: 'white' }}>
      {Number.isNaN(value) ? value : Number(value).toLocaleString('pt-br')}
    </div>
    {description && (
      <div className="box-description" style={color && { color: 'white' }}>
        {description}
      </div>
    )}
    {source ? (
      <div className="box-source" style={color && { color: 'white' }}>
        {source}
      </div>
    ) : null}
  </div>
)

SmallBox.propTypes = propTypes
SmallBox.defaultProps = defaultProps
export default SmallBox
