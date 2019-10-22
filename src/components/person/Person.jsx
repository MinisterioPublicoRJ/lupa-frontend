import React from 'react'
import PropTypes from 'prop-types'

import './Person.scss'

const renderDetails = data => (
  <pre
    className="Person-details"
    dangerouslySetInnerHTML={{ __html: data && data.split('@').join('<br/>') }}
  />
)

const renderPhoto = (photo, photoLink) => {
  if (!photo && !photoLink) {
    return null
  }
  const photoSrc = photo ? `data:image/png;base64,${photo}` : photoLink

  return (
    <div className="Person-picture">
      {' '}
      <img src={photoSrc} alt="Person" style={{ width: '100%' }} />
      {' '}
    </div>
  )
}

const propTypes = {
  name: PropTypes.string.isRequired,
  photo: PropTypes.string,
  photoLink: PropTypes.string,
  data: PropTypes.string,
  last: PropTypes.bool,
}
const defaultProps = {
  photo: null,
  photoLink: null,
  data: null,
  last: false,
}

const Person = ({
  name, photo, photoLink, data, last,
}) => (
  <div className="Person-container" style={last ? { borderBottom: 0 } : null}>
    {renderPhoto(photo, photoLink)}
    <div className="Person-content">
      { name ? <h5 className="Person-name">{name}</h5> : null }
      { renderDetails(data) }
    </div>
  </div>
)

Person.propTypes = propTypes
Person.defaultProps = defaultProps
export default Person
