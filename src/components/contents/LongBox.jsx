import React from 'react'
import PropTypes from 'prop-types'

import Briefcase from '../icons/briefcase'
import ArrowRight from '../icons/arrowRight'

import './Box.scss'

const propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  contrast: PropTypes.bool,
}
const defaultProps = { contrast: false }

const LongBox = ({ title, value, contrast }) => (
  <div className="box LongBox-container" style={contrast ? { backgroundColor: '#009DFD' } : null}>
    <div className="LongBox-icon">
      <Briefcase className="LongBox-img" />
    </div>
    <div className="LongBox-title" style={contrast ? { color: 'white' } : null}>
      {title ? title.toLocaleUpperCase('pt-br') : null}
    </div>
    <div className="LongBox-value" style={contrast ? { color: 'white' } : null}>
      {value}
    </div>
    <div className="LongBox-arrow">
      <ArrowRight className="LongBox-img" />
    </div>
  </div>
)

LongBox.propTypes = propTypes
LongBox.defaultProps = defaultProps
export default LongBox
