import React from 'react'
import PropTypes from 'prop-types'

import './Box.scss'

const propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  source: PropTypes.string,
}
const defaultProps = {
  source: null,
}

const SmallBoxContrast = ({ title, source, value }) => (
  <div className="box SmallBox SmallBoxContrast">
    <div className="box-value">{value}</div>
    <div className="box-title">{title.toLocaleUpperCase('pt-br')}</div>
    {source ? <div className="box-source">{source}</div> : null}
  </div>
)

SmallBoxContrast.defaultProps = defaultProps
SmallBoxContrast.propTypes = propTypes
export default SmallBoxContrast
