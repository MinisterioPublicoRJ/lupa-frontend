import React from 'react'
import PropTypes from 'prop-types'

import './Graph.scss'
import GraphPie from './GraphPie'
import GraphBar from './graphBar'

const checkGraphType = ({ type, data }) => {
  switch (type) {
    case 'pie':
      return <GraphPie data={data} />
    case 'bar':
      return <GraphBar data={data} />
    default:
      return <div>error!</div>
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
}

const defaultProps = {
  title: null,
  description: null,
  source: null,
  infoPressed: () => console.log('hello'),
  sourcePressed: () => console.log('hello'),
}

const graph = ({
  type, title, description, data, source, infoPressed, sourcePressed,
}) => (
  <div className="Graph-container">
    <div className="Graph-header">
      <div className="Graph-title-right">
        <span className="Graph-name">{title.toLocaleUpperCase('pt-br')}</span>
        {description && <span className="Graph-description ">{description}</span>}
      </div>
      <div className="Graph-title-left" onClick={() => infoPressed()}>
        i
      </div>
    </div>
    <div className="Graph-body">{checkGraphType({ type, data })}</div>
    {source && (
      <span className="Graph-source" onClick={() => sourcePressed()}>
        mais detalhes ->
      </span>
    )}
  </div>
)

graph.propTypes = propTypes
graph.defaultProps = defaultProps
export default graph
