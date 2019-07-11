import React from 'react'
import NumberBox from './NumberBox'
import OrderedList from './OrderedList'
import UnorderedList from './UnorderedList'
import Graph from '../graphs/Graph'
import './Box.scss'

const Box = ({ content }) => {
  switch (content.type) {
    case 'number':
      return <NumberBox content={content} />
    case 'ordered list':
      return <OrderedList content={content} />
    case 'unordered list':
      return <UnorderedList content={content} />
    case 'graph':
      return (
        <Graph
          type={content.graph.type}
          title={content.title}
          description={content.description}
          data={content.graph.data}
          categories={content.graph.categories}
          source={content.source}
        />
      )
    default:
      return content
  }
}

export default Box
