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
// const defaultProps = {}
//
const graphStyle = {
  data: { fill: 'tomato' },
  labels: { textAnchor: 'middle' },
}

const graphBar = ({ data }) => {
  const xLabels = data.map(item => item.x)
  const yLabels = data.map(item => item.y)
  return (
    <VictoryChart domainPadding={50} x={item => item.x.getFullYear()}>
      <VictoryBar data={data} style={graphStyle} />
      <VictoryAxis tickFormat={tick => tick.getFullYear()} tickValues={xLabels} />
      <VictoryAxis dependentAxis tickValues={yLabels} />
    </VictoryChart>
  )
}

graphBar.propTypes = propTypes
// graphBar.defaultProps = defaultProps
export default graphBar
