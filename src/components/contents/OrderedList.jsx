import React from 'react'
import './Box.scss'

const OrderedList = ({content}) => {
  return <div className="box">
    <h1>{content.title}</h1>
    <ol>
      {
        content.list.map((itemList, key) => <li key={key}>{itemList}</li>)
      }
    </ol>
    {
      content && content.image
      ? <img src={content.image} alt="" className="box--image"/>
      : null
    }
    <small>{content.source}</small>
  </div>
}

export default OrderedList
