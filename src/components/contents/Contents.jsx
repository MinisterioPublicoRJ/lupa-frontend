import React from 'react'
import Box from './Box'

import './Contents.scss'
import EntityError from '../utils/EntityError'

const Contents = ({ boxes, error, navigateToEntity }) => (
  <div className="contents">
    {error ? <EntityError errorInfo={error} /> : null}
    {boxes ? boxes.map((d, key) => (
      <Box
        key={key}
        content={d}
        navigateToEntity={navigateToEntity}
      />
    )) : null}
  </div>
)

export default Contents
