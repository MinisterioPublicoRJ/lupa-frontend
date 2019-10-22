import React from 'react'
import PropTypes from 'prop-types'

import './Box.scss'
import SmallBox from './SmallBox'
import LongBox from './LongBox'
import Graph from '../graphs/Graph'
import LoadingBox from './LoadingBox'
import ErrorBox from './ErrorBox'

import List from './lists/List'

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
          description={content.external_data.details}
          source={content.external_data.source}
          sourceLink={content.external_data.link_externo}
        />
      )
    case 'texto_grande':
      return (
        <LongBox
          color={color}
          link={content.external_data.link_externo}
          title={content.exibition_field}
          value={content.external_data.dado}
          description={content.external_data.details}
          source={content.external_data.source}
          sourceLink={content.external_data.link_externo}
        />
      )
    case 'lista_filtrada':
    case 'lista_ordenada':
    case 'lista_sem_ordenacao':
    case 'lista_pessoa':
      return (
        <List
          type={content.data_type}
          color={color}
          title={content.exibition_field}
          list={content.external_data}
          image={content.icon}
          source={content.external_data[0].source ? content.external_data[0].source : null}
          navigateToEntity={navigateToEntity}
          sourceLink={content.external_data.link_externo}
        />
      )
    case 'grafico_pizza':
    case 'grafico_barra_vertical':
    case 'grafico_barra_horizontal':
    case 'grafico_linha_horizontal':
      return (
        <Graph
          color={color}
          type={content.data_type}
          title={content.exibition_field}
          data={content.external_data}
          source={content.external_data[0].source ? content.external_data[0].source : null}
          sourceLink={content.external_data[0].link_externo ? content.external_data[0].link_externo : null}
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
