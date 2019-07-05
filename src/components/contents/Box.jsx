import React from 'react'
import NumberBox from './NumberBox'
import OrderedList from './OrderedList'
import UnorderedList from './UnorderedList'
import Graph from '../graphs/Graph'
import './Box.scss'

const Box = ({content}) => {
  switch (content.type) {
    case 'number':
      return <NumberBox content={content}/>
    case 'ordered list':
      return <OrderedList content={content}/>
    case 'unordered list':
      return <UnorderedList content={content}/>
    case 'graph':
      return <Graph content={content} />
    default:
      return content
  }
}

export default Box
