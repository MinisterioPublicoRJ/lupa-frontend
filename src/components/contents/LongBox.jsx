import React from 'react'
import PropTypes from 'prop-types'

import { ReactComponent as ArrowRight } from '../icons/arrowRight.svg'
import { ReactComponent as Briefcase } from '../icons/briefcase.svg'

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
      <Briefcase />
    </div>
    <div className="LongBox-title" style={contrast ? { color: 'white' } : null}>
      {title.toLocaleUpperCase('pt-br')}
    </div>
    <div className="LongBox-value" style={contrast ? { color: 'white' } : null}>
      {value}
    </div>
    <div className="LongBox-arrow">
      <ArrowRight />
    </div>
  </div>
)

LongBox.propTypes = propTypes
LongBox.defaultProps = defaultProps
export default LongBox
