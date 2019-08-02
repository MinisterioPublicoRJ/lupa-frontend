import React from 'react'
import PropTypes from 'prop-types'
import {
  VictoryChart, VictoryLine, VictoryAxis, VictoryScatter,
} from 'victory'

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
    angle: 45,
    // padding: 10,
    fontSize: 9,
    fontFamily: 'Roboto',
    fill: '#696568',
  },
}

const graphBar = ({ data }) => {
  const xLabels = data.map(item => item.rotulo)
  return (
    <VictoryChart
      domainPadding={{ x: 50 }}
      padding={{
        top: 50,
        bottom: 50,
        left: 5,
        right: 5,
      }}
    >
      <VictoryLine
        data={data}
        style={graphStyle}
        x="rotulo"
        y={item => Number(item.dado)}
        labels={item => Number(item.dado)
          .toFixed(2)
          .toLocaleString('pt-br')
        }
      />
      <VictoryScatter data={data} x="rotulo" y={item => Number(item.dado)} />
      <VictoryAxis tickValues={xLabels} style={axisStyles} />
    </VictoryChart>
  )
}

graphBar.propTypes = propTypes
export default graphBar
