import React from 'react'
import PropTypes from 'prop-types'

import Source from './genericComponents/Source'
import './Box.scss'

const propTypes = {
  source: PropTypes.string,
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  sourceLink: PropTypes.string,
}
const defaultProps = {
  source: null,
  color: null,
  sourceLink: null,
}

const HeaderBox = ({
  source, title, value, color, sourceLink,
}) => (
  <div className="Box HeaderBox">
    <div className="HeaderBox--dataContainer">
      <div className="HeaderBox--title">{title && title.toLocaleUpperCase('pt-br')}</div>
      <div className="HeaderBox--value">
        {value && isNaN(value)
          ? value.toLocaleUpperCase('pt-br')
          : Number(value).toLocaleString('pt-br')}
      </div>
    </div>
    {source && <Source link={sourceLink} text={source} color={color} />}
  </div>
)

HeaderBox.propTypes = propTypes
HeaderBox.defaultProps = defaultProps
export default HeaderBox
