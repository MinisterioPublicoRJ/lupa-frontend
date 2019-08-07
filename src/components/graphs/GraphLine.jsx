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
    angle: 45,
    fontSize: 9,
    fontFamily: 'Roboto',
    fill: '#696568',
    textAnchor: 'start',
  },
}

const graphLine = ({ data, colorScale }) => {
  const xLabels = data.map(item => item.rotulo)
  const types = [] // will be filled with unique detalhes string
  data
    .filter(item => item.detalhes)
    .forEach((item) => {
      if (types.indexOf(item.detalhes) === -1) {
        types.push(item.detalhes)
      }
    })
  return (
    <VictoryChart
      domainPadding={{ x: 50 }}
      padding={{
        top: 10,
        bottom: 50,
        left: 5,
        right: 5,
      }}
    >
      {types.map((type, i) => (
        <VictoryLine
          key={type}
          data={data.filter(item => item.detalhes === type)}
          style={{ ...graphStyle, data: { stroke: colorScale[i] } }}
          x="rotulo"
          y={item => Number(item.dado)}
          labels={item => Number(item.dado)
            .toLocaleString('pt-br')
          }
        />
      ))}
      <VictoryScatter
        data={data}
        x="rotulo"
        y={item => Number(item.dado)}
        style={{ data: { fill: item => colorScale[types.indexOf(item.detalhes)] } }}
      />
      <VictoryAxis tickValues={xLabels} style={axisStyles} />
    </VictoryChart>
  )
}

graphLine.propTypes = propTypes
export default graphLine
