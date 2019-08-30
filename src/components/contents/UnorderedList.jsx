import React from 'react'
import PropTypes from 'prop-types'

import './Box.scss'

const propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, dado: PropTypes.string }))
    .isRequired,
  image: PropTypes.node,
  source: PropTypes.string,
  navigateToEntity: PropTypes.func,
}
const defaultProps = {
  image: null,
  source: null,
}

const clickToFeature = (event, item, callback) => {
  if (item && item.entidade_interna && item.id_interna) {
    callback(item.entidade_interna, item.id_interna)
  }
}

const UnorderedList = ({
  title, source, list, image, navigateToEntity,
}) => (
  <div className="box list-box">
    <div className="list-box--header">
      {title ? <h1 className="list-box--title">{title}</h1> : null}
      {image ? <img src={image} alt="" className="list-box--icon" /> : null}
    </div>
    <ol className="list-box--list">
      {list.map(itemList => (
        <li
          key={`${itemList.rotulo}-${itemList.dado}`}
          className="list-box--list-item"
          onClick={event => clickToFeature(event, itemList, navigateToEntity)}
        >
          {itemList.rotulo ? (
            <div className="list-box--list-item-label">{itemList.rotulo}</div>
          ) : null}
          {itemList.dado ? <div className="list-box--list-item-value">{itemList.dado}</div> : null}
        </li>
      ))}
    </ol>
    {source ? <div className="list-box--source">{source}</div> : null}
  </div>
)

UnorderedList.propTypes = propTypes
UnorderedList.defaultProps = defaultProps
export default UnorderedList
