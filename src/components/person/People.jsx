import React from 'react'
import PropTypes from 'prop-types'

import Person from './Person'

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

People.propTypes = propTypes
export default People
