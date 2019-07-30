import React from 'react'
import PropTypes from 'prop-types'
import { VictoryChart, VictoryBar, VictoryAxis } from 'victory'

const propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      dado: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      rotulo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      fonte: PropTypes.string,
      detalhes: PropTypes.string,
      link: PropTypes.string,
    }),
  ).isRequired,
  sortedData: PropTypes.arrayOf(
    PropTypes.shape({
      dado: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      rotulo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      fonte: PropTypes.string,
      detalhes: PropTypes.string,
      link: PropTypes.string,
    }),
  ).isRequired,
  colorScale: PropTypes.arrayOf(PropTypes.string).isRequired,
}

const graphStyle = {
  labels: {
    fontSize: 9,
    fontFamily: 'Roboto',
    fill: '#696568',
  },
}

const axisStyles = {
  axis: { stroke: '#696568' },
  tickLabels: {
    padding: 5,
    fontSize: 10,
    fontFamily: 'Roboto',
    fill: '#696568',
  },
}

const calculateYDomain = (data) => {
  const minY = Number(data[0].dado) * 0.95
  const maxY = Number(data[data.length - 1].dado) * 1.05
  return { y: [minY, maxY] }
}

const graphBarHorizontal = ({ data, sortedData, colorScale }) => {
  const dataWithColors = data.map((item, i) => ({
    x: (data.length - i).toLocaleString('pt-br'),
    y: Number(item.dado),
    color: colorScale[i % colorScale.length],
  }))
  const yDomain = calculateYDomain(sortedData)
  return (
    <VictoryChart domainPadding={{ x: 5 }}>
      <VictoryBar
        horizontal
        data={dataWithColors}
        style={{
          data: {
            fill: item => item.color,
          },
          ...graphStyle,
        }}
        barRatio={0.5}
        labels={item => item.y.toLocaleString('pt-br')}
        domain={yDomain}
      />
      <VictoryAxis
        style={{
          axis: { stroke: '#696568' },
          tickLabels: {
            padding: 5,
            fontSize: 10,
            fontFamily: 'Roboto',
            fill: label => colorScale[(label - 1) % colorScale.length],
          },
        }}
      />
      <VictoryAxis
        dependentAxis
        style={axisStyles}
        tickFormat={tick => tick.toLocaleString('pt-br')}
      />
    </VictoryChart>
  )
}

graphBarHorizontal.propTypes = propTypes
export default graphBarHorizontal
