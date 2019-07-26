import React from 'react'
import PropTypes from 'prop-types'
import { VictoryPie } from 'victory'

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

const colorScale = ['#00A5FD', '#388BCB', '#E8E8E8', '#929698', '#34495E', '#FF6347']

const graphStyle = {
  labels: { display: 'none' },
}

const GraphPie = ({ data }) => (
  <VictoryPie
    data={data}
    radius={150}
    y={item => Number(item.dado)}
    colorScale={colorScale}
    style={graphStyle}
  />
)

GraphPie.propTypes = propTypes
export default GraphPie
