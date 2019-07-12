import React from 'react'
import './Box.scss'

const UnorderedList = ({ content }) => (
  <div className="box list-box">
    <div className="list-box--header">
      <h1 className="list-box--title">{content.title}</h1>
      <img className="list-box--icon" src="" alt="Icone" />
    </div>
    <ol className="list-box--list">
      {content.list.map((itemList, key) => (
        <li key={key} className="list-box--list-item">
          {itemList}
        </li>
      ))}
    </ol>
    {content && content.image ? <img src={content.image} alt="" className="box--image" /> : null}
    <p className="list-box--source">{content.source}</p>
  </div>
)

export default UnorderedList
