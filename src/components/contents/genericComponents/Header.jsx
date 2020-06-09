import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import './GenericComponents.scss'

const BIG_TITLE_MIN_LENGTH = 32

const propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
  image: PropTypes.node,
  onSearchPressed: PropTypes.func,
  total: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}
const defaultProps = {
  color: null,
  image: null,
  onSearchPressed: null,
  total: null,
}

const Header = ({
  title, image, color, onSearchPressed, total,
}) => (
  <div className="Generic-Header" style={color && { backgroundColor: color }}>
    <div className="Generic-Header--icon-container">
      {image && <img src={image} alt="" className="Generic-Header--icon" />}
    </div>
    <h4 className="Generic-Header--title-container Generic-Header--title">
      {title && title.toLocaleUpperCase()}
      {total && <small className="Generic-Header--title">{total}</small>}
    </h4>
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
