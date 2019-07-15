import React from 'react'
import PropTypes from 'prop-types'

import { ReactComponent as ArrowRight } from '../icons/arrowRight.svg'
import { ReactComponent as Briefcase } from '../icons/briefcase.svg'

import './Box.scss'

const propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}

const LongBox = ({ title, value }) => (
  <div className="box LongBox-container">
    <div className="LongBox-icon">
      <Briefcase />
    </div>
    <div className="LongBox-title">{title.toLocaleUpperCase('pt-br')}</div>
    <div className="LongBox-value">{value}</div>
    <div className="LongBox-arrow">
      <ArrowRight />
    </div>
  </div>
)

LongBox.propTypes = propTypes
export default LongBox
