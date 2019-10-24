import React from 'react'
import PropTypes from 'prop-types'

import './List.scss'

const propTypes = {
  name: PropTypes.string.isRequired,
  photo: PropTypes.string,
  photoLink: PropTypes.string,
  data: PropTypes.string,
  externalLink: PropTypes.string,
  internalLink: PropTypes.shape({ entidade: PropTypes.string, id: PropTypes.string }),
  navigateToEntity: PropTypes.func.isRequired,
}
const defaultProps = {
  photo: null,
  photoLink: null,
  data: null,
  externalLink: null,
  internalLink: null,
}

const renderDetails = data => (
  <pre
    className="Pli--details"
    dangerouslySetInnerHTML={{ __html: data && data.split('@').join('<br/>') }}
  />
)

const renderPhoto = (photo, photoLink) => {
  if (!photo && !photoLink) {
    return null
  }
  const photoSrc = photo ? `data:image/png;base64,${photo}` : photoLink

  return (
    <div className="Pli--picture">
      {' '}
      <img src={photoSrc} alt="Person" style={{ width: '100%' }} />
      {' '}
    </div>
  )
}

const Person = ({
  name, photo, photoLink, data, externalLink, internalLink, navigateToEntity,
}) => {
  const clickable = externalLink || internalLink

  const handleLink = () => (externalLink
    ? window.open(externalLink)
    : navigateToEntity(internalLink.entidade, internalLink.id))

  return (
    <div className="Pli">
      {renderPhoto(photo, photoLink)}
      <div
        className="Pli--content"
        onClick={clickable ? handleLink : null}
        style={clickable && { cursor: 'pointer' }}
      >
        { name ? <h5 className="Pli--name">{name}</h5> : null }
        { renderDetails(data) }
      </div>
    </div>
  )
}

Person.propTypes = propTypes
Person.defaultProps = defaultProps
export default Person
