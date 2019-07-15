import React from 'react'

import './Box.scss'
import SmallBox from './SmallBox'
import SmallBoxContrast from './SmallBoxContrast'
import LongBox from './LongBox'
import OrderedList from './OrderedList'
import UnorderedList from './UnorderedList'
import Graph from '../graphs/Graph'
import Person from '../person/Person'

// ADICIONAR PROPTYPES CONFORME FOR LIGANDO COM O BACK!

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
    case 'person':
      return (
        <Person name={content.name} job={content.job} photo={content.photo} data={content.data} />
      )
    default:
      return <div>INSIRA AQUI UM ERRO MELHOR!</div>
  }
}

export default Box
