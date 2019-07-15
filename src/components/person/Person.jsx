import React from 'react'
import PropTypes from 'prop-types'

import './Person.scss'
import Governor from './Governor'

const pickDetail = (job, data) => {
  switch (job) {
    case 'governor':
      return <Governor vice={data.vice} cargo={data.cargo} />
    default:
      return null
  }
}

const propTypes = {
  name: PropTypes.string.isRequired,
  job: PropTypes.string.isRequired,
  photo: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
}
const defaultProps = {
  photo:
    'https://fantoy.com.br/media/catalog/product/cache/1/image/578x/9df78eab33525d08d6e5fb8d27136e95/b/a/bandai_super_mario_01_5_1.jpg',
}

const Person = ({
  name, job, photo, data,
}) => (
  <div className="Person-container">
    <div className="Person-picture">
      {' '}
      <img src={photo} />
      {' '}
    </div>
    <div className="Person-content">
      <div className="Person-main-data">
        <span className="Person-name">{name}</span>
        <span className="Person-job">{job}</span>
      </div>
      <div className="Person-custom">
        {pickDetail(job, data)}
      </div>
    </div>
  </div>
)

Person.propTypes = propTypes
Person.defaultProps = defaultProps
export default Person
