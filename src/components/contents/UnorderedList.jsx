import React from 'react'
import './Box.scss'

const UnorderedList = ({content}) => {
  return <div className="box">
    <h1>{content.title}</h1>
    <ul>
      {
        content.list.map((itemList, key) => <li key={key}>{itemList}</li>)
      }
    </ul>
    {
      content && content.image
      ? <img src={content.image} alt="" className="box--image" />
      : null
    }
    <small>{content.source}</small>
  </div>
}

export default UnorderedList
