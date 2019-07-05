import React from 'react'
import GraphPie from './GraphPie'

const checkGraphType = ({ content }) => {
  switch (content.graph.type) {
    case 'pie':
      return <GraphPie content={content.graph}/>
    default:
      return content
  }
}

const Graph = content => {
  return <div className="box">
    <h1>{content.title}</h1>
    {
      checkGraphType(content)
    }
    <small>{content.source}</small>
  </div>
}

export default Graph
