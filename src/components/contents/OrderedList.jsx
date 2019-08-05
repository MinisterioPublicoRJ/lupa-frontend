import React from 'react'
import PropTypes from 'prop-types'

import './Box.scss'
import './Lists.scss'

const propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, dado: PropTypes.string })).isRequired,
  image: PropTypes.node,
  source: PropTypes.string,
  navigateToEntity: PropTypes.func,
}
const defaultProps = {
  image: null,
  source: null,
}

const clickToFeature = (event, item, callback) => {
  if (item && item.link_interno_entidade && item.link_interno_id) {
    callback(item.link_interno_entidade, item.link_interno_id)
  }
}

const OrderedList = ({
  title, source, list, image, navigateToEntity,
}) => (
  <div className="box list-box">
    <div className="list-box--header">
      {title ? <h1 className="list-box--title">{title}</h1> : null}
      {image ? <img src={image} alt="" className="list-box--icon" /> : null}
    </div>
    <ol className="list-box--list">
      {list.map((itemList, index) => (
        <li
          key={`${itemList.label}-${itemList.dado}`}
          className="list-box--list-item"
          onClick={event => clickToFeature(event, itemList, navigateToEntity)}
        >
          <div className="list-box--list-item-position">{index + 1}</div>
          <div className="list-box--list-item-body">
            {itemList.label ? (
              <div className="list-box--list-item-label">{itemList.label}</div>
            ) : null}
            {itemList.dado ? <div className="list-box--list-item-value">{itemList.dado}</div> : null}
          </div>
        </li>
      ))}
    </ol>
    {source ? <div className="list-box--source">{source}</div> : null}
  </div>
)

OrderedList.propTypes = propTypes
OrderedList.defaultProps = defaultProps
export default OrderedList
