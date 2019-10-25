import React from 'react'
import PropTypes from 'prop-types'

import './Graph.scss'
import GraphPie from './GraphPie'
import GraphBar from './GraphBar'
import GraphBarHorizontal from './GraphBarHorizontal'
import GraphStackedBar from './GraphStackedBar'
import GraphLine from './GraphLine'
import { ColorScale } from '../../utils/colorScale'

import ErrorBox from '../ErrorBox'
import Header from '../genericComponents/Header'
import Source from '../genericComponents/Source'

const checkGraphType = ({ type, data, sortedData }) => {
  switch (type) {
    case 'grafico_pizza':
      return <GraphPie data={sortedData} colorScale={ColorScale} />
    case 'grafico_barra_vertical':
      return <GraphBar data={data} sortedData={sortedData} />
    case 'grafico_barra_horizontal':
      return <GraphBarHorizontal data={data} sortedData={sortedData} colorScale={ColorScale} />
    case 'grafico_linha_horizontal':
      return <GraphLine data={data} colorScale={ColorScale} />
    case 'stackedBar':
      return <GraphStackedBar data={data} />
    default:
      return <ErrorBox />
  }
}

const propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string),
  color: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      rotulo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      dado: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ).isRequired,
  image: PropTypes.node,
  source: PropTypes.string,
  sourceLink: PropTypes.string,
  type: PropTypes.string.isRequired,
  title: PropTypes.string,
}

const defaultProps = {
  categories: [],
  color: null,
  image: null,
  source: null,
  sourceLink: null,
  title: null,
}

const loadCategories = (data) => {
  const types = []
  data
    .filter(item => item.details)
    .forEach((item) => {
      if (types.indexOf(item.details) === -1) {
        types.push(item.details)
      }
    })
  return types.map((type, i) => (
    <span className="Graph-categories" key={type}>
      <span
        className="Graph-color"
        style={{ backgroundColor: ColorScale[i % ColorScale.length] }}
      />
      {type}
    </span>
  ))
}

const graph = ({
  type, title, data, source, categories, color, image, sourceLink,
}) => {
  const sortedData = [...data].sort((a, b) => Number(a.dado) - Number(b.dado))

  return (
    <div className="Graph-container">
      <Header title={title} image={image} color={color} />
      <div className="Graph-body">{checkGraphType({ type, data, sortedData })}</div>
      {categories && (
        <div className="Graph-categories-container">
          {type === 'grafico_linha_horizontal' && loadCategories(data)}
          {categories
            ? categories.map((item, i) => (
              <span className="Graph-categories">
                <span className="Graph-color" style={{ backgroundColor: ColorScale[i] }} />
                {item}
              </span>
            ))
            : null}
          {type === 'grafico_pizza'
            && sortedData.map((item, i) => (
              <span className="Graph-categories" key={item.rotulo}>
                <span
                  className="Graph-color"
                  style={{ backgroundColor: ColorScale[i % ColorScale.length] }}
                />
                <div className="Category-line">
                  <span>{`${item.rotulo}: `}</span>
                  <span>{Number(item.dado).toLocaleString('pt-br')}</span>
                </div>
              </span>
            ))}
          {type === 'grafico_barra_horizontal'
            && data.map((item, i) => (
              <span className="Graph-categories" key={item.rotulo}>
                <span
                  className="Graph-color"
                  style={{ backgroundColor: ColorScale[i % ColorScale.length] }}
                />
                <span style={{ color: ColorScale[i % ColorScale.length] }}>{`${i + 1}`}</span>
                <div className="Category-line">
                  <span>{`- ${item.rotulo}: `}</span>
                  <span>{Number(item.dado).toLocaleString('pt-br')}</span>
                </div>
              </span>
            ))}
        </div>
      )}
      {source && <Source link={sourceLink} text={source} />}
    </div>
  )
}

graph.propTypes = propTypes
graph.defaultProps = defaultProps
export default graph
