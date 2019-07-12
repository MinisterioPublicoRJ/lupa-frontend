import React from 'react'
import PropTypes from 'prop-types'
import {
  VictoryChart, VictoryStack, VictoryBar, VictoryAxis,
} from 'victory'

const propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        x: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        y: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      }),
    ),
  ).isRequired,
}

// const getAllYValues = (data) => {
//   const allTicks = []
//   data.forEach((bar) => {
//     bar.forEach((item) => {
//       if (allTicks.indexOf(item.y) === -1) {
//         console.log(item)
//         allTicks.push(item.y)
//       }
//     })
//   })
//   console.log(allTicks)
//   return allTicks
// }

const graphStackedBar = ({ data }) => {
  const xLabels = data[0].map(item => item.x)
  // se quiser controlar melhor os valores no domínio
  // const yLabels = getAllYValues(data)
  return (
    <VictoryChart domainPadding={50}>
      <VictoryStack colorScale={['#000000', '#0000FF', '#FF6347']}>
        {data.map((barGroup, i) => (
          <VictoryBar key={i} data={barGroup} />
        ))}
      </VictoryStack>
      <VictoryAxis tickFormat={tick => tick} tickValues={xLabels} />
      <VictoryAxis dependentAxis tickFormat={tick => tick} />
    </VictoryChart>
  )
}

graphStackedBar.propTypes = propTypes
export default graphStackedBar
