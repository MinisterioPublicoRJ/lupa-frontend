import React from 'react'

import './Box.scss'
import SmallBox from './SmallBox'
import SmallBoxContrast from './SmallBoxContrast'
import LongBox from './LongBox'
import OrderedList from './OrderedList'
import UnorderedList from './UnorderedList'
import Graph from '../graphs/Graph'

const Box = ({ content }) => {
  switch (content.type) {
    case 'small-box':
      return (
        <SmallBox title={content.title} value={content.value} description={content.description} />
      )
    case 'small-box-contrast':
      return <SmallBoxContrast title={content.title} value={content.value} />
    case 'long-box':
      return <LongBox title={content.title} value={content.value} />
    case 'long-box-contrast':
      return <LongBox title={content.title} value={content.value} contrast />
    case 'ordered list':
      return (
        <OrderedList
          title={content.title}
          list={content.list}
          image={content.image}
          source={content.souce}
        />
      )
    case 'unordered list':
      return (
        <UnorderedList
          title={content.title}
          list={content.list}
          image={content.image}
          source={content.souce}
        />
      )
    case 'graph':
      return (
        <Graph
          type={content.graph.type}
          highlight={content.graph.highlight}
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
