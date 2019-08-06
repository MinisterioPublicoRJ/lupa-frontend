import React from 'react'
import PropTypes from 'prop-types'

import './Person.scss'

const renderDetails = data => (
  <span
    className="person-details"
    dangerouslySetInnerHTML={{ __html: data && data.split('@').join('<br/>') }}
  />
)

const renderPhoto = (photo) => {
  if (!photo) {
    return null
  }
  return (
    <div className="Person-picture">
      {' '}
      <img src={`data:image/png;base64,${photo}`} alt="Person" />
      {' '}
    </div>
  )
}

const propTypes = {
  name: PropTypes.string.isRequired,
  photo: PropTypes.string,
  data: PropTypes.string,
}
const defaultProps = {
  photo: null,
  data: null,
}

const Person = ({ name, photo, data }) => (
  <div className="Person-container">
    {renderPhoto(photo)}
    <div className="Person-content">
      <div className="Person-main-data">
        <span className="Person-name">{name}</span>
      </div>
      <div className="Person-custom">{renderDetails(data)}</div>
    </div>
  </div>
)

Person.propTypes = propTypes
Person.defaultProps = defaultProps
export default Person
