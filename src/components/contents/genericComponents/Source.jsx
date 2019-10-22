import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string,
  color: PropTypes.string,
}
const defaultProps = { link: null, color: null }

const Source = ({ link, text, color }) => {
  console.log(color)
  return (
    <div
      className="Source"
      onClick={link ? window.open(link) : null}
      style={link && { cursor: 'pointer' }}
    >
      <div style={{ color: color || '#929698' }}>{text}</div>
    </div>
  )
}

Source.propTypes = propTypes
Source.defaultProps = defaultProps
export default Source
