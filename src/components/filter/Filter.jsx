import React from 'react'

import './Filter.scss'
import { ReactComponent as MapIcon } from '../icons/stateMap.svg'
import { ReactComponent as Briefcase } from '../icons/briefcase.svg'

const filter = props => (
  <div className="Filter-container">
    <div className="Filter-button" onClick={() => props.filterClicked('convergencia')}>
      Convergência
    </div>
    <div className="Filter-button" onClick={() => props.filterClicked('institucional')}>
      <Briefcase />
      Institucional
    </div>
    <div className="Filter-button" onClick={() => props.filterClicked('social')}>
      <MapIcon />
      Social
    </div>
  </div>
)

export default filter
