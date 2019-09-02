import React from 'react'
import PropTypes from 'prop-types'

import Briefcase from '../icons/briefcase'
import ArrowRight from '../icons/arrowRight'

import './Box.scss'

const propTypes = {
  source: PropTypes.string,
  color: PropTypes.string,
  link: PropTypes.string,
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}
const defaultProps = {
  source: null,
  link: null,
  color: null,
}

const LongBox = ({
  source, title, value, link, color,
}) => (
  <div className="box LongBox" style={color ? { backgroundColor: color } : null}>
    <div className="box-icon">
      <Briefcase className="box-img" overlay={color ? 'white' : null} />
    </div>
    <div className="box-title" style={color ? { color: 'white' } : null}>
      {title ? title.toLocaleUpperCase('pt-br') : null}
    </div>
    <div className="box-value" style={color ? { color: 'white' } : null}>
      {Number.isNaN(value) ? value : Number(value).toLocaleString('pt-br')}
    </div>
    <div className="box-arrow">
      {link ? <ArrowRight className="box-img" overlay={color ? 'white' : null} /> : null}
    </div>
    {source ? <div className="box-source" style={color ? { color: 'white' } : null}>{source}</div> : null}
  </div>
)

LongBox.propTypes = propTypes
LongBox.defaultProps = defaultProps
export default LongBox
