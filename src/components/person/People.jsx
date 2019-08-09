import React from 'react'
import PropTypes from 'prop-types'

import Person from './Person'

import './People.scss'

const propTypes = {
  title: PropTypes.string.isRequired,
  peopleArray: PropTypes.arrayOf(
    PropTypes.shape({
      dado: PropTypes.string,
      detalhes: PropTypes.string,
      photo: PropTypes.string,
    }),
  ).isRequired,
}

const People = ({ title, peopleArray }) => {
  if (!peopleArray || peopleArray.length === 0) {
    return null
  }
  return (
    <div className="People--container">
      {title ?
        <div className="People--header">
          <div className="People--title">{title}</div>
        </div>
      : null}
      <div className="People--body">
        {peopleArray.map((person, index, arr) => (
          <Person
            key={index}
            data={person.detalhes}
            name={person.dado}
            photo={person.imagem}
            last={index === arr.length - 1}
          />
        ))}
      </div>
    </div>
  )
}

People.propTypes = propTypes
export default People
