import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Briefcase from '../icons/briefcase'
import ArrowRight from '../icons/arrowRight'

import './Box.scss'

const propTypes = {
  source: PropTypes.string,
  color: PropTypes.string,
  link: PropTypes.string,
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  hasDetails: PropTypes.bool,
}
const defaultProps = {
  source: null,
  link: null,
  color: null,
}

const checkIfLinkExists = (link, value, color) => {
  if (link) {
    return <a className="box-link" href={link} target="_blank" rel="noopener noreferrer">
      <div className="box-value" style={color ? { color: 'white' } : null}>
        {value && isNaN(value) ? value : Number(value).toLocaleString('pt-br')}
      </div>
      <div className="box-arrow">
        {link ? <ArrowRight className="box-img" overlay={color ? 'white' : null} /> : null}
      </div>
    </a>
  }
  return <React.Fragment>
    <div className="box-value" style={color ? { color: 'white' } : null}>
        {value && isNaN(value) ? value : Number(value).toLocaleString('pt-br')}
    </div>
    <div className="box-arrow">
      {link ? <ArrowRight className="box-img" overlay={color ? 'white' : null} /> : null}
    </div>
  </React.Fragment>
}

const LongBox = ({
  source, title, value, link, color, sourceLink, hasDetails,
}) => (
  <div className="box LongBox" style={color ? { backgroundColor: color } : null}>
    <div className="box-icon">
      <Briefcase className="box-img" overlay={color ? 'white' : null} />
    </div>
    <div className="box-title" style={color ? { color: 'white' } : null}>
      {title ? title.toLocaleUpperCase('pt-br') : null}
      {hasDetails ?
        <FontAwesomeIcon
          style={color ? {color: 'white'} : {color: '#009dfd'}}
          icon={faSearch}
        />
      : null}
    </div>
    {checkIfLinkExists(link, value, color)}
    {source ? (
      <div
        className="box-source"
        style={color ? { color: 'white' } : null}
        onClick={() => (sourceLink ? window.open(sourceLink) : null)}
      >
        {source}
      </div>
    ) : null}
  </div>
)

LongBox.propTypes = propTypes
LongBox.defaultProps = defaultProps
export default LongBox
