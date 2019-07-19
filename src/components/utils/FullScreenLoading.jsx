import React from 'react'

import './FullScreenLoading.scss'

const FullScreenLoading = () => (
  <div className="Loading-container">
    <div className="lds-ripple">
      <div />
      <div />
    </div>
    <p className="Loading-text">Carregando</p>
  </div>
)

export default FullScreenLoading
