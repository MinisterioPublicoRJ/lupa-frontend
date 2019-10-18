import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import './GenericComponents.scss'

const propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
  type: PropTypes.string.isRequired,
}
const defaultProps = { color: null }

const Header = ({
  title, image, color, type, onSearchPressed, total,
}) => (
  <div className="Generic-Header" style={color && { backgroundColor: color }}>
    <div className="Generic-Header--icon-container">
      {image && <img src={image} alt="" className="Generic-Header--icon" />}
    </div>
    <div className="Generic-Header--title-container">
      {title && <span className="Generic-Header--title">{title.toLocaleUpperCase()}</span>}
      {total && <span className="Generic-Header--title">{total}</span>}
    </div>
    <div className="Generic-Header--search-container">
      {onSearchPressed ? (
        <FontAwesomeIcon
          style={{ color: 'white' }}
          icon={faSearch}
          onClick={() => onSearchPressed()}
        />
      ) : null}
    </div>
  </div>
)

Header.propTypes = propTypes
Header.defaultProps = defaultProps
export default Header
