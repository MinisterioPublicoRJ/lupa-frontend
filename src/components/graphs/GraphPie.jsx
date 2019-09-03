import React from 'react'
import PropTypes from 'prop-types'
import { VictoryPie } from 'victory'

const propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      dado: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      fonte: PropTypes.string,
      detalhes: PropTypes.string,
      link: PropTypes.string,
    }),
  ).isRequired,
  colorScale: PropTypes.arrayOf(PropTypes.string).isRequired,
}

const graphStyle = {
  labels: {
    fontSize: 11,
    fontFamily: 'Roboto',
    fill: '#696568',
  },
  data: {
    stroke: '#fff',
    strokeWidth: 0.5,
  },
}

/**
 * only gives a label if the value is greater than 3%
 * @param  {string} valueStr slice value
 * @param  {number} total    sum of all slices
 * @return {string || null}
 */
const renderLabel = (valueStr, total) => {
  const percentage = (Number(valueStr) * 100) / total
  if (percentage > 3) return `${percentage.toFixed(2)}%`
  return null
}

const GraphPie = ({ data, colorScale }) => {
  const total = data.reduce((soma, item) => soma + Number(item.dado), 0)

  return (
    <VictoryPie
      data={data}
      radius={150}
      labelRadius={155}
      y={item => Number(item.dado)}
      labels={item => renderLabel(item.dado, total)}
      colorScale={colorScale}
      style={graphStyle}
    />
  )
}

GraphPie.propTypes = propTypes
export default GraphPie
