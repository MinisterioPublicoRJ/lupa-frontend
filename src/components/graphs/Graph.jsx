import React from 'react'
import PropTypes from 'prop-types'

import './Graph.scss'
import GraphPie from './GraphPie'
import GraphBar from './GraphBar'
import GraphBarHorizontal from './GraphBarHorizontal'
import GraphStackedBar from './GraphStackedBar'
import ErrorBox from '../contents/ErrorBox'

const colorScale = ['#00A5FD', '#388BCB', '#E8E8E8', '#929698', '#34495E', '#FF6347']

const checkGraphType = ({ type, data, sortedData }) => {
  switch (type) {
    case 'grafico_pizza':
      return <GraphPie data={data} />
    case 'grafico_barra_vertical':
      return <GraphBar data={data} sortedData={sortedData} />
    case 'grafico_barra_horizontal':
      return <GraphBarHorizontal data={data} sortedData={sortedData} colorScale={colorScale} />
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
  // infoPressed: PropTypes.func,
  sourcePressed: PropTypes.func,
  categories: PropTypes.arrayOf(PropTypes.string),
  highlight: PropTypes.bool,
}

const defaultProps = {
  title: null,
  description: null,
  source: null,
  // infoPressed: () => {},
  sourcePressed: () => {},
  categories: [],
  highlight: false,
}

const graph = ({
  type,
  title,
  description,
  data,
  source,
  // infoPressed,
  sourcePressed,
  categories,
  highlight,
}) => {
  const sortedData = [...data].sort((a, b) => Number(a.dado) - Number(b.dado))
  return (
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
        {/* <div className="Graph-title-left" onClick={() => infoPressed()}>
          i
        </div> */}
      </div>
      <div className="Graph-body" style={highlight ? { backgroundColor: '#35B1FD' } : null}>
        {checkGraphType({ type, data, sortedData })}
      </div>
      {categories && (
        <div
          className="Graph-categories-container"
          style={highlight ? { backgroundColor: '#35B1FD' } : null}
        >
          {categories
            ? categories.map((item, i) => (
              <span className="Graph-categories">
                <span className="Graph-color" style={{ backgroundColor: colorScale[i] }} />
                {item}
              </span>
            ))
            : null}
          {type === 'grafico_pizza'
            ? sortedData.map((item, i) => (
              <span className="Graph-categories" key={item.rotulo}>
                <span
                  className="Graph-color"
                  style={{ backgroundColor: colorScale[i % colorScale.length] }}
                />
                {`${item.rotulo}: ${Number(item.dado).toLocaleString('pt-br')}`}
              </span>
            ))
            : null}
          {type === 'grafico_barra_horizontal'
            ? data.map((item, i) => (
              <span className="Graph-categories" key={item.rotulo}>
                <span
                  className="Graph-color"
                  style={{ backgroundColor: colorScale[i % colorScale.length] }}
                />
                <span style={{ color: colorScale[i % colorScale.length] }}>
                  {`[${i + 1}]`}
                </span>
                {`${item.rotulo}: ${Number(item.dado).toLocaleString('pt-br')}`}
              </span>
            ))
            : null}
        </div>
      )}
      {source && (
        <span
          className="Graph-source"
          onClick={() => sourcePressed()}
          style={highlight ? { color: '#FFFFFF' } : null}
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
