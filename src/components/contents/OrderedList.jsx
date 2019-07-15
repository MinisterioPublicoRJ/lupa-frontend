import React from 'react'
import PropTypes from 'prop-types'

import './Box.scss'
import './Lists.scss'

const propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  image: PropTypes.node,
  source: PropTypes.string,
}
const defaultProps = {
  image: null,
  source: null,
}

const OrderedList = ({
  title, source, list, image,
}) => (
  <div className="box list-box">
    <div className="list-box--header">
      <h1 className="list-box--title">{title}</h1>
      <img className="list-box--icon" src="" alt="Icone" />
    </div>
    <ol className="list-box--list">
      {list.map((itemList, key) => (
        <li key={key} className="list-box--list-item list-box--list-item__ordered">
          {itemList}
        </li>
      ))}
    </ol>
    {image ? <img src={image} alt="" className="box--image" /> : null}
    <p className="list-box--source">{source}</p>
  </div>
)

OrderedList.propTypes = propTypes
OrderedList.defaultProps = defaultProps
export default OrderedList
