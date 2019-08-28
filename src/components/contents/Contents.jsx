import React from 'react'
import PropTypes from 'prop-types'

import Box from './Box'
import Theme from './Theme'
import './Contents.scss'
import EntityError from '../utils/EntityError'

const propTypes = {
  boxes: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string })).isRequired,
  themes: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })).isRequired,
  error: PropTypes.bool,
  navigateToEntity: PropTypes.func,
}

const defaultProps = {
  error: false,
  navigateToEntity: null,
}

const Contents = ({
  boxes, themes, error, navigateToEntity,
}) => (
  <div className="contents">
    {error ? <EntityError errorInfo={error} /> : null}
    {boxes
      ? boxes.map(box => <Box key={box.id} content={box} navigateToEntity={navigateToEntity} />)
      : null}
    {themes ? themes.map(item => <Theme />) : null}
  </div>
)

Contents.propTypes = propTypes
Contents.defaultProps = defaultProps
export default Contents
