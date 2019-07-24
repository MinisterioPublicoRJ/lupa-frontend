import React from 'react'
import { VictoryPie } from 'victory'

const GraphPie = ({ data }) => <VictoryPie data={data} x="label" y="dado" />

export default GraphPie
