import React from 'react'
import PropTypes from 'prop-types'

import './GenericComponents.scss'

const propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
  type: PropTypes.string.isRequired,
}
const defaultProps = { color: null }

const Header = ({
  title, image, color, type,
}) => (
  <div className="Generic-Header" style={color && { backgroundColor: color }}>
    <div className="Generic-Header--icon-container">
      {image ? <img src={image} alt="" className="Generic-Header--icon" /> : null}
    </div>
    <div className="Generic-Header--title-container">
      {title ? <span className="Generic-Header--title">{title.toLocaleUpperCase()}</span> : null}
    </div>
  </div>
)

Header.propTypes = propTypes
Header.defaultProps = defaultProps
export default Header
