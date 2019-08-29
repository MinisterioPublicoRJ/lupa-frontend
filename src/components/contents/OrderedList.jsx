import React from 'react'
import PropTypes from 'prop-types'

import './Box.scss'
import './Lists.scss'

const propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, data: PropTypes.string })).isRequired,
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
      {title ? <span className="list-box--title">{title}</span> : null}
      {image ? <img src={image} alt="" className="list-box--icon" /> : null}
    </div>
    <ol className="list-box--list">
      {list.map((itemList, index) => (
        <li
          key={`${itemList.rotulo}-${itemList.data}`}
          className="list-box--list-item"
          onClick={event => clickToFeature(event, itemList, navigateToEntity)}
        >
          <div className="list-box--list-item-position">{index + 1}</div>
          <div className="list-box--list-item-body">
            {itemList.rotulo ? (
              <div className="list-box--list-item-label">{itemList.rotulo}</div>
            ) : null}
            {itemList.data ? <div className="list-box--list-item-value">{itemList.data}</div> : null}
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
