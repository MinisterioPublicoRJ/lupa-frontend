import React from 'react'

import './Box.scss'
import './Spinner.scss'

const LoadingBox = () => (
  <div className="box SmallBox SmallBoxContrast">
    <div className="lds-spinner">
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
)

export default LoadingBox
