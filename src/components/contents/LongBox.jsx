import React from 'react'
import PropTypes from 'prop-types'

import { ReactComponent as ArrowRight } from '../icons/arrowRight.svg'
import { ReactComponent as Briefcase } from '../icons/briefcase.svg'

import './Box.scss'

const propTypes = {
  contrast: PropTypes.bool,
  source: PropTypes.string,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}
const defaultProps = {
  contrast: false,
  source: null,
}

const LongBox = ({ contrast, source, title, value }) => (
  <div className="box LongBox" style={contrast ? { backgroundColor: '#009DFD' } : null}>
    <div className="box-icon">
      <Briefcase />
    </div>
    <div className="box-title" style={contrast ? { color: 'white' } : null}>
      {title ? title.toLocaleUpperCase('pt-br') : null}
    </div>
    <div className="box-value" style={contrast ? { color: 'white' } : null}>
      {value}
    </div>
    <div className="box-arrow">
      <ArrowRight />
    </div>
    {source ? <div className="box-source">{source}</div> : null}
  </div>
)

LongBox.propTypes = propTypes
LongBox.defaultProps = defaultProps
export default LongBox
