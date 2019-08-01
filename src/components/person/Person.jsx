import React from 'react'
import PropTypes from 'prop-types'

import './Person.scss'

const renderDetails = data => {
  return (
    <span
      className="person-details"
      dangerouslySetInnerHTML={{__html: data.split('@').join('<br/>')}}
    ></span>
  )
}

const renderPhoto = photo => {
  if (!photo) {
    return null
  }
  return (
    <div className="Person-picture">
      {' '}
      <img src={photo} alt="Person" />
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
  photo:
    'https://fantoy.com.br/media/catalog/product/cache/1/image/578x/9df78eab33525d08d6e5fb8d27136e95/b/a/bandai_super_mario_01_5_1.jpg',
}

const Person = ({
  name, photo, data,
}) => (
  <div className="Person-container">
    {renderPhoto(photo)}
    <div className="Person-content">
      <div className="Person-main-data">
        <span className="Person-name">{name}</span>
      </div>
      <div className="Person-custom">
        {renderDetails(data)}
      </div>
    </div>
  </div>
)

Person.propTypes = propTypes
Person.defaultProps = defaultProps
export default Person
