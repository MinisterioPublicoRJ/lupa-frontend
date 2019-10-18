import React from 'react'
import PropTypes from 'prop-types'

import './List.scss'

const propTypes = {
  ordered: PropTypes.string.isRequired,
  position: PropTypes.number.isRequired,
  label: PropTypes.string,
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}
const defaultProps = {
  label: null,
  data: null,
}

const RegularListItem = ({
  ordered, position, label, data,
}) => (
  <div className="Rli">
    {ordered && <div className="Rli--position">{position + 1}</div>}
    <div className="Rli--item">
      {label && <div>{label}</div>}
      {data && <div>{isNaN(data) ? data : Number(data).toLocaleString('pt-br')}</div>}
    </div>
  </div>
)

RegularListItem.propTypes = propTypes
RegularListItem.defaultProps = defaultProps
export default RegularListItem
