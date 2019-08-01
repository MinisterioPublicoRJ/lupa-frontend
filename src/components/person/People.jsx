import React from 'react'
import PropTypes from 'prop-types'

import Person from './Person'

import './People.scss'

const propTypes = {
  title: PropTypes.string,
  peopleArray: PropTypes.arrayOf(
    PropTypes.shape({
      dado: PropTypes.string,
      detalhes: PropTypes.string,
      photo: PropTypes.string,
    })
  ),
}

const People = ({
  title, peopleArray
}) => {
  if (!peopleArray || peopleArray.length === 0) {
    return null
  }
  return (
    <div className="People--container">
      <div className="People--header">
        <div className="People--title">{title}</div>
      </div>
      {peopleArray.map((person, index) =>
        <Person
          key={index}
          data={person.detalhes}
          name={person.dado}
          photo={person.imagem}
        />
      )}
    </div>
  )
}

People.propTypes = propTypes
export default People
