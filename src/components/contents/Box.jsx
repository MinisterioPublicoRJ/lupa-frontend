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
import ErrorBox from './ErrorBox'

// ADICIONAR PROPTYPES CONFORME FOR LIGANDO COM O BACK!

const Box = ({ content }) => {
  switch (content.data_type) {
    case 'texto_pequeno':
      return (
        <SmallBox
          title={content.exibition_field}
          value={content.external_data.dado}
          description={content.description}
        />
      )
    case 'texto_pequeno_destaque':
      return (
        <SmallBoxContrast
          title={content.exibition_field}
          value={content.external_data.dado}
          description={content.description}
        />
      )
    case 'long-box':
      return <LongBox title={content.title} value={content.value} />
    case 'long-box-contrast':
      return <LongBox title={content.title} value={content.value} contrast />
    case 'lista_ordenada':
      return (
        <OrderedList
          title={content.exibition_field}
          list={content.external_data}
          image={content.icon}
          source={content.external_data[0].fonte}
        />
      )
    case 'lista_sem_ordenacao':
      return (
        <UnorderedList
          title={content.exibition_field}
          list={content.external_data}
          image={content.icon}
          source={content.external_data[0].fonte}
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
      return <LoadingBox />
    default:
      return <ErrorBox />
  }
}

export default Box
