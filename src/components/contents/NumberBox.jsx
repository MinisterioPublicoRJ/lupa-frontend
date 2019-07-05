import React from 'react'
import './Box.scss'

const NumberBox = ({content}) => {
  return <div className="box">
    <h1>{content.title}</h1>
    <h2>{content.number}</h2>
    {
      content && content.text
      ? <p>{content.text}</p>
      : null
    }
    <small>{content.source}</small>
  </div>
}

export default NumberBox
