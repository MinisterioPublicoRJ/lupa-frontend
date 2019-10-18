import React from 'react'
import PropTypes from 'prop-types'

import './List.scss'

const propTypes = {}
const defaultProps = {}

const Oli = ({ item }) => {
  console.log(item)
  return (
    <div className="Oli">
      <div className="Oli--position">{item.position + 1}</div>
      <div className="Oli--item">
        {item.rotulo && <div>{item.rotulo}</div>}
        {item.dado && (
          <div>
            {isNaN(item.dado) ? item.dado : Number(item.dado).toLocaleString('pt-br')}
          </div>
        )}
      </div>
    </div>
  )
}

Oli.propTypes = propTypes
Oli.defaultProps = defaultProps
export default Oli
