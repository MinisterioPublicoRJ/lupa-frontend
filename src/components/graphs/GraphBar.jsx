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
  data: { fill: 'tomato' },
  labels: { textAnchor: 'middle' },
}

const graphBar = ({ data }) => {
  const xLabels = data.map(item => item.label)
  const yLabels = data.map(item => item.dado)
  return (
    <VictoryChart domainPadding={50}>
      <VictoryBar data={data} style={graphStyle} x="label" y="dado" />
      <VictoryAxis tickValues={xLabels} />
      {/* tickFormat={tick => tick.getFullYear()} */}
      <VictoryAxis dependentAxis tickValues={yLabels} />
    </VictoryChart>
  )
}

graphBar.propTypes = propTypes
export default graphBar
