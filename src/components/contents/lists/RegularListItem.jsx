import React from 'react'
import PropTypes from 'prop-types'

import './List.scss'

const propTypes = {
  ordered: PropTypes.string.isRequired,
  position: PropTypes.number.isRequired,
  label: PropTypes.string,
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  externalLink: PropTypes.string,
  internalLink: PropTypes.shape({ entidade: PropTypes.string, id: PropTypes.string }),
  navigateToEntity: PropTypes.func.isRequired,
}
const defaultProps = {
  label: null,
  data: null,
  externalLink: null,
  internalLink: null,
}

const RegularListItem = ({
  ordered,
  position,
  label,
  data,
  externalLink,
  internalLink,
  navigateToEntity,
}) => {
  const clickable = externalLink || internalLink

  const handleLink = () => (externalLink
    ? window.open(externalLink)
    : navigateToEntity(internalLink.entidade, internalLink.id))

  return (
    <div className="Rli">
      {ordered && <div className="Rli--position">{position + 1}</div>}
      <div
        className="Rli--item"
        onClick={clickable ? handleLink : null}
        style={clickable && { cursor: 'pointer' }}
      >
        {label && <div>{label}</div>}
        {data && <div>{isNaN(data) ? data : Number(data).toLocaleString('pt-br')}</div>}
      </div>
    </div>
  )
}

RegularListItem.propTypes = propTypes
RegularListItem.defaultProps = defaultProps
export default RegularListItem
