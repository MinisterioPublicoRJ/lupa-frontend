import React from 'react'
import PropTypes from 'prop-types'

import './Box.scss'
import './lists/List.scss'

import PersonListItem from './lists/PersonListItem'

const propTypes = {
  id: PropTypes.string.isRequired,
  details: PropTypes.string.isRequired,
  imagem: PropTypes.node,
}
const defaultProps = {
  imagem: null,
}

const DescriptionBox = ({
  id,
  details,
  imagem,
}) => (
  <div className="box List">
    <div className="List--container">
      <PersonListItem
        key={id}
        data={details}
        photo={imagem}
      />
    </div>
  </div>
)

DescriptionBox.propTypes = propTypes
DescriptionBox.defaultProps = defaultProps
export default DescriptionBox
