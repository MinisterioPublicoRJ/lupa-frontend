import React from 'react'
import PropTypes from 'prop-types'

import Person from './Person'

import './People.scss'

const propTypes = {
  title: PropTypes.string.isRequired,
  peopleArray: PropTypes.arrayOf(
    PropTypes.shape({
      dado: PropTypes.string,
      details: PropTypes.string,
      photo: PropTypes.string,
    }),
  ).isRequired,
  color: PropTypes.string,
}

const defaultProps = { color: 'null' }

const People = ({ title, peopleArray, color }) => {
  if (!peopleArray || peopleArray.length === 0) {
    return null
  }

  return (
    <div className="People--container">
      {title ? (
        <h4 className="People--title" style={color && { backgroundColor: color }}>
          {title}
        </h4>
      ) : null}
      <div className="People--body">
        {peopleArray.map((person, index, arr) => (
          <Person
            key={person.id}
            data={person.details}
            name={person.dado}
            photo={person.imagem}
            photoLink={person.linkimagem}
            last={index === arr.length - 1}
          />
        ))}
      </div>
    </div>
  )
}

People.propTypes = propTypes
People.defaultProps = defaultProps
export default People
