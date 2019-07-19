import React from 'react'

import './Box.scss'
import SmallBox from './SmallBox'
import SmallBoxContrast from './SmallBoxContrast'
import LongBox from './LongBox'
import OrderedList from './OrderedList'
import UnorderedList from './UnorderedList'
import Graph from '../graphs/Graph'
import Person from '../person/Person'
import LoadingBox from './LoadingBox'

// ADICIONAR PROPTYPES CONFORME FOR LIGANDO COM O BACK!

const Box = ({ content }) => {
  switch (content.data_type) {
    case 'texto_pequeno':
      return (
        <SmallBox title={content.exibition_field} value={content.external_data.dado} description={content.description} />
      )
    case 'texto_pequeno_destaque':
      return <SmallBoxContrast title={content.exibition_field} value={content.external_data.dado} description={content.description} />
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
    case 'loading':
      return (<LoadingBox />)
    default:
      return <div>INSIRA AQUI UM ERRO MELHOR!</div>
  }
}

export default Box
