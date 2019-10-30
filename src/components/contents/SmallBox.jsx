import React from 'react'
import PropTypes from 'prop-types'

import Source from './genericComponents/Source'
import './Box.scss'

const propTypes = {
  description: PropTypes.string,
  source: PropTypes.string,
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  sourceLink: PropTypes.string,
}
const defaultProps = {
  description: null,
  source: null,
  color: null,
  sourceLink: null,
}

const SmallBox = ({
  description, source, title, value, color, sourceLink, openModal,
}) => (
  <div
    className="box SmallBox"
    style={color && { backgroundColor: color }}
    onClick={openModal}
  >
    <div className="box-title" style={color && { color: 'white' }}>
      {title && title.toLocaleUpperCase('pt-br')}
    </div>
    <div className="box-value" style={color && { color: 'white' }}>
      {value && isNaN(value) ? value.toLocaleUpperCase('pt-br') : Number(value).toLocaleString('pt-br')}
    </div>
    <div className="box-description" style={color && { color: 'white' }}>
      {description || null}
    </div>
    { source && <Source link={sourceLink} text={source} color={color} />}
  </div>
)

SmallBox.propTypes = propTypes
SmallBox.defaultProps = defaultProps
export default SmallBox
