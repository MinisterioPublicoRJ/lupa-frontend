import React from 'react'
import PropTypes from 'prop-types'

import './Box.scss'
import SmallBox from './SmallBox'
import SmallBoxContrast from './SmallBoxContrast'
import LongBox from './LongBox'
import OrderedList from './OrderedList'
import UnorderedList from './UnorderedList'
import FilterableList from './FilterableList'
import Graph from '../graphs/Graph'
import People from '../person/People'
import LoadingBox from './LoadingBox'
import ErrorBox from './ErrorBox'

const propTypes = {
  color: PropTypes.string,
  navigateToEntity: PropTypes.func.isRequired,
  // content: PropTypes.shape({
  //   data_type: PropTypes.string,
  //   exibition_field: PropTypes.string,
  //   external_data: PropTypes.shape({
  //     dado: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  //     source: PropTypes.string,
  //   }),
  // }).isRequired,
}
const defaultProps = {
  color: null,
}

const Box = ({ content, navigateToEntity, color }) => {
  switch (content.data_type) {
    case 'texto_pequeno':
      return (
        <SmallBox
          color={color}
          title={content.exibition_field}
          value={content.external_data.dado}
          description={content.external_data.detalhes}
          source={content.external_data.source}
        />
      )
    case 'texto_pequeno_destaque':
      return (
        <SmallBoxContrast
          title={content.exibition_field}
          value={content.external_data.dado}
          description={content.external_data.detalhes}
          source={content.external_data.source}
        />
      )
    case 'texto_grande':
      return (
        <LongBox
          link={content.external_data.link_externo}
          title={content.exibition_field}
          value={content.external_data.dado}
          description={content.external_data.detalhes}
          source={content.external_data.source}
        />
      )
    case 'long-box-contrast':
      return (
        <LongBox
          contrast
          title={content.exibition_field}
          value={content.external_data.dado}
          description={content.external_data.detalhes}
          source={content.external_data.source}
        />
      )
    case 'lista_filtrada':
      return (
        <FilterableList
          title={content.exibition_field}
          list={content.external_data}
          image={content.icon}
          source={content.external_data[0].source ? content.external_data[0].source : null}
          navigateToEntity={navigateToEntity}
        />
      )
    case 'lista_ordenada':
      return (
        <OrderedList
          title={content.exibition_field}
          list={content.external_data}
          image={content.icon}
          source={content.external_data[0].source ? content.external_data[0].source : null}
          navigateToEntity={navigateToEntity}
        />
      )
    case 'lista_sem_ordenacao':
      return (
        <UnorderedList
          title={content.exibition_field}
          list={content.external_data}
          image={content.icon}
          source={content.external_data[0].source ? content.external_data[0].source : null}
          navigateToEntity={navigateToEntity}
        />
      )
    case 'lista_pessoa':
      return (
        <People title={content.exibition_field} peopleArray={content.external_data} color={color} />
      )
    case 'grafico_pizza':
    case 'grafico_barra_vertical':
    case 'grafico_barra_horizontal':
    case 'grafico_linha_horizontal':
      return (
        <Graph
          type={content.data_type}
          title={content.exibition_field}
          data={content.external_data}
          source={content.external_data[0].source ? content.external_data[0].source : null}
        />
      )
    case 'loading':
      return <LoadingBox color={color} />
    default:
      return <ErrorBox color={color} />
  }
}
Box.propTypes = propTypes
Box.defaultProps = defaultProps
export default Box
