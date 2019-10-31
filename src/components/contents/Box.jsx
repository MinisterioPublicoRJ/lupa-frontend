import React from 'react'
import PropTypes from 'prop-types'

import './Box.scss'
import SmallBox from './SmallBox'
import LongBox from './LongBox'
import Graph from './graphs/Graph'
import DescriptionBox from './DescriptionBox'
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

const Box = ({ content, navigateToEntity, color, openModal }) => {
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
          openModal={openModal}
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
          color={color}
          image={content.icon}
          list={content.external_data}
          navigateToEntity={navigateToEntity}
          source={content.external_data[0].source ? content.external_data[0].source : null}
          sourceLink={content.external_data.link_externo}
          type={content.data_type}
          title={content.exibition_field}
        />
      )
    case 'grafico_pizza':
    case 'grafico_barra_vertical':
    case 'grafico_barra_horizontal':
    case 'grafico_linha_horizontal':
      return (
        <Graph
          color={color}
          data={content.external_data}
          image={content.icon}
          navigateToEntity={navigateToEntity}
          source={content.external_data[0].source ? content.external_data[0].source : null}
          sourceLink={content.external_data[0].link_externo ? content.external_data[0].link_externo : null}
          type={content.data_type}
          title={content.exibition_field}
        />
      )
    case 'texto_descricao':
      return (
        <DescriptionBox
          id={content.id}
          details={content.external_data[0].details}
          imagem={content.external_data[0].imagem}
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
