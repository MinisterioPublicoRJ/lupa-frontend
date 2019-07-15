import React from 'react'
import './Box.scss'

// {content && content.text ? <p>{content.text}</p> : null}
// <small>{content.source}</small>
const NumberBox = ({ title, value, description }) => (
  <div className="box Number-box">
    <div className="Number-box-title">{title.toLocaleUpperCase('pt-br')}</div>
    <div className="Number-box-value">{value}</div>
    {description && <div className="Number-box-description">{description}</div>}
  </div>
)

export default NumberBox
