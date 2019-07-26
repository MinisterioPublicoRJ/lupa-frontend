import React from 'react'
import Box from './Box'

import './Contents.scss'
import EntityError from '../utils/EntityError'

const Contents = ({ boxes, error }) => (
  <div className="contents">
    {error ? <EntityError errorInfo={error} /> : null}
    {boxes ? boxes.map((d, key) => <Box key={key} content={d} />) : null}
  </div>
)

export default Contents
