import React from 'react'
import PropTypes from 'prop-types'

import './List.scss'

const propTypes = {}
const defaultProps = {}

const RegularListItem = ({ item }) => (
  <div className="Rli">
    {item.ordered && <div className="Rli--position">{item.position + 1}</div>}
    <div className="Rli--item">
      {item.rotulo && <div>{item.rotulo}</div>}
      {item.dado && (
        <div>
          {isNaN(item.dado) ? item.dado : Number(item.dado).toLocaleString('pt-br')}
        </div>
      )}
    </div>
  </div>
)

RegularListItem.propTypes = propTypes
RegularListItem.defaultProps = defaultProps
export default RegularListItem
