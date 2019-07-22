import React from 'react'

import './Box.scss'
import './Spinner.scss'

const LoadingBox = () => (
  <div className="box SmallBoxContrast-container">
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
