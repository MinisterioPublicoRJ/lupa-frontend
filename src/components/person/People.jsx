import React from 'react'
import PropTypes from 'prop-types'

import Person from './Person'

const People = ({
  title, peopleArray
}) => {
  console.log('People', title, peopleArray)
  if (!peopleArray || peopleArray.length === 0) {
    return null
  }
  return (
    <div className="people-container">
      <div className="people-title">{title}</div>
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

export default People
