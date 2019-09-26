import React from 'react'
import PropTypes from 'prop-types'

import './Graph.scss'
import GraphPie from './GraphPie'
import GraphBar from './GraphBar'
import GraphBarHorizontal from './GraphBarHorizontal'
import GraphStackedBar from './GraphStackedBar'
import GraphLine from './GraphLine'
import ErrorBox from '../contents/ErrorBox'
import { ColorScale } from '../utils/colorScale'

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
  type: PropTypes.string.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      rotulo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      dado: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ).isRequired,
  source: PropTypes.string,
  color: PropTypes.string,
  sourcePressed: PropTypes.func,
  categories: PropTypes.arrayOf(PropTypes.string),
}

const defaultProps = {
  title: null,
  description: null,
  source: null,
  sourcePressed: () => {},
  categories: [],
}

const loadCategories = (data) => {
  const types = []
  data
    .filter(item => item.detalhes)
    .forEach((item) => {
      if (types.indexOf(item.detalhes) === -1) {
        types.push(item.detalhes)
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
  type, title, description, data, source, sourcePressed, categories, color, sourceLink,
}) => {
  const sortedData = [...data].sort((a, b) => Number(a.dado) - Number(b.dado))

  return (
    <div className="Graph-container">
      <div className="Graph-header" style={{ backgroundColor: color || '#00a5fd' }}>
        <div className="Graph-title-right">
          <span className="Graph-name">{title.toLocaleUpperCase('pt-br')}</span>
          {description && <span className="Graph-description">{description}</span>}
        </div>
      </div>
      <div className="Graph-body">{checkGraphType({ type, data, sortedData })}</div>
      {categories && (
        <div className="Graph-categories-container">
          {categories
            ? categories.map((item, i) => (
              <span className="Graph-categories">
                <span className="Graph-color" style={{ backgroundColor: ColorScale[i] }} />
                {item}
              </span>
            ))
            : null}
          {type === 'grafico_pizza'
            ? sortedData.map((item, i) => (
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
            ))
            : null}
          {type === 'grafico_barra_horizontal'
            ? data.map((item, i) => (
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
            ))
            : null}
          {type === 'grafico_linha_horizontal' ? loadCategories(data) : null}
        </div>
      )}
      {source && (
        <span
          className="Graph-source"
          onClick={() => (sourceLink ? window.open(sourceLink) : null)}
          style={{ color: color || '#00a5fd' }}
        >
          {source}
        </span>
      )}
    </div>
  )
}

graph.propTypes = propTypes
graph.defaultProps = defaultProps
export default graph
