import React from 'react'
import PropTypes from 'prop-types'
import { VictoryChart, VictoryBar, VictoryAxis } from 'victory'

const propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      data: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      rotulo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      fonte: PropTypes.string,
      detalhes: PropTypes.string,
      link: PropTypes.string,
    }),
  ).isRequired,
  sortedData: PropTypes.arrayOf(
    PropTypes.shape({
      data: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      rotulo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      fonte: PropTypes.string,
      detalhes: PropTypes.string,
      link: PropTypes.string,
    }),
  ).isRequired,
}

const graphStyle = {
  data: { fill: 'tomato' },
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
  const minY = Number(data[0].data) * 0.95
  const maxY = Number(data[data.length - 1].data) * 1.05
  return { y: [minY, maxY] }
}

const graphBar = ({ data, sortedData }) => {
  const xLabels = data.map(item => item.label)
  const yDomain = calculateYDomain(sortedData)
  return (
    <VictoryChart
      domainPadding={{ x: 50 }}
      padding={{
        top: 10,
        bottom: 30,
        left: 65,
        right: 50,
      }}
    >
      <VictoryBar
        data={data}
        style={graphStyle}
        x="rotulo"
        y={item => Number(item.data)}
        labels={item => Number(item.data).toLocaleString('pt-br')}
        domain={yDomain}
      />
      <VictoryAxis tickValues={xLabels} style={axisStyles} />
      <VictoryAxis dependentAxis style={axisStyles} tickFormat={tick => tick.toLocaleString('pt-br')} />
    </VictoryChart>
  )
}

graphBar.propTypes = propTypes
export default graphBar
