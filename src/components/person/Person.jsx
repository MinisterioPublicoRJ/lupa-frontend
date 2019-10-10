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
  const photoSrcString = `data:image/png;base64,${photo}`

  return (
    <div className="Person-picture">
      {' '}
      <img src={photoSrcString} alt="Person" style={{ width: '100%' }} />
      {' '}
    </div>
  )
}

const propTypes = {
  name: PropTypes.string.isRequired,
  photo: PropTypes.string,
  data: PropTypes.string,
  last: PropTypes.bool,
}
const defaultProps = {
  photo: null,
  data: null,
  last: false,
}

const Person = ({
  name, photo, data, last,
}) => (
  <div className="Person-container" style={last ? { borderBottom: 0 } : null}>
    {renderPhoto(photo)}
    <div className="Person-content">
      {
        name ? <div className="Person-main-data">
          <span className="Person-name">{name}</span>
        </div>
        : null
      }
      <div className="Person-custom">{renderDetails(data)}</div>
    </div>
  </div>
)

Person.propTypes = propTypes
Person.defaultProps = defaultProps
export default Person
