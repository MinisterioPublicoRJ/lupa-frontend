import React from 'react'
import PropTypes from 'prop-types'
import { VictoryPie } from 'victory'

const propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      dado: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      fonte: PropTypes.string,
      detalhes: PropTypes.string,
      link: PropTypes.string,
    }),
  ).isRequired,
}

const GraphPie = ({ data }) => <VictoryPie data={data} x="label" y="dado" />

GraphPie.propTypes = propTypes
export default GraphPie
