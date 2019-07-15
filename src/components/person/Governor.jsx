import React from 'react'
import PropTypes from 'prop-types'

import './Person.scss'

const propTypes = {
  vice: PropTypes.string.isRequired,
  cargo: PropTypes.string.isRequired,
}

const Governor = ({ vice, cargo }) => (
  <div className="Governor-container">
    <span className="Governor-vice">{vice}</span>
    <span className="Governor-cargo">{cargo}</span>
  </div>
)

Governor.propTypes = propTypes
export default Governor
