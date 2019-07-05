import React from 'react'
import { VictoryPie } from 'victory'

const GraphPie = ({ content }) => {
  return <VictoryPie data={content.data} />
}

export default GraphPie
