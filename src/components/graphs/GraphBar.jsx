import React from 'react'
import PropTypes from 'prop-types'
import { VictoryChart, VictoryBar, VictoryAxis } from 'victory'

const propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      y: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ).isRequired,
}

const graphStyle = {
  parent: { fill: 'red' },
  data: { fill: 'tomato' },
  labels: { display: 'none' },
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

const graphBar = ({ data }) => {
  const xLabels = data.map(item => item.label)
  const yLabels = data.map(item => Number(item.dado))
  return (
    <VictoryChart
      domainPadding={{ x: 50 }}
      padding={{
        top: 50,
        bottom: 50,
        left: 65,
        right: 50,
      }}
    >
      <VictoryBar data={data} style={graphStyle} x="label" y="dado" />
      <VictoryAxis tickValues={xLabels} style={axisStyles} />
      {/* tickFormat={tick => tick.getFullYear()} */}
      <VictoryAxis dependentAxis tickValues={yLabels} style={axisStyles} />
    </VictoryChart>
  )
}

graphBar.propTypes = propTypes
export default graphBar
