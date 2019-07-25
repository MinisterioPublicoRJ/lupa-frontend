import React from 'react'
import PropTypes from 'prop-types'

import './Graph.scss'
import GraphPie from './GraphPie'
import GraphBar from './GraphBar'
import GraphStackedBar from './GraphStackedBar'
import ErrorBox from '../contents/ErrorBox'

const checkGraphType = ({ type, data }) => {
  switch (type) {
    case 'grafico_pizza':
      return <GraphPie data={data} />
    case 'grafico_barra_vertical':
      return <GraphBar data={data} />
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
      x: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      y: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ).isRequired,
  source: PropTypes.string,
  infoPressed: PropTypes.func,
  sourcePressed: PropTypes.func,
  categories: PropTypes.arrayOf(PropTypes.string),
  highlight: PropTypes.bool,
}

const defaultProps = {
  title: null,
  description: null,
  source: null,
  infoPressed: () => console.log('hello'),
  sourcePressed: () => console.log('hello'),
  categories: [],
  highlight: false,
}

const colorScale = ['#000000', '#0000FF', '#FF6347']

const graph = ({
  type,
  title,
  description,
  data,
  source,
  infoPressed,
  sourcePressed,
  categories,
  highlight,
}) => (
  <div className="Graph-container" style={highlight ? { backgroundColor: '#35B1FD' } : null}>
    <div className="Graph-header">
      <div className="Graph-title-right">
        <span className="Graph-name" style={highlight ? { color: '#FFFFFF' } : null}>
          {title.toLocaleUpperCase('pt-br')}
        </span>
        {description && (
          <span className="Graph-description" style={highlight ? { color: '#FFFFFF' } : null}>
            {description}
          </span>
        )}
      </div>
      <div className="Graph-title-left" onClick={() => infoPressed()}>
        i
      </div>
    </div>
    <div className="Graph-body" style={highlight ? { backgroundColor: '#35B1FD' } : null}>
      {checkGraphType({ type, data })}
    </div>
    {categories && (
      <div
        className="Graph-categories-container"
        style={highlight ? { backgroundColor: '#35B1FD' } : null}
      >
        {categories.map((item, i) => (
          <span className="Graph-categories">
            <span className="Graph-color" style={{ backgroundColor: colorScale[i] }} />
            {item}
          </span>
        ))}
      </div>
    )}
    {source && (
      <span
        className="Graph-source"
        onClick={() => sourcePressed()}
        style={highlight ? { color: '#FFFFFF' } : null}
      >
        mais detalhes ->
      </span>
    )}
  </div>
)

graph.propTypes = propTypes
graph.defaultProps = defaultProps
export default graph
