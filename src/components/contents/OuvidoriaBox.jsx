import React from 'react'
import './OuvidoriaBox.scss'
import imgOuvidoria from './ouvidoria.jpeg'

const OuvidoriaBox = () => {
  return (
    <div className="Ouvidoria--container">
      <div className="Ouvidoria--image">
        <img src={imgOuvidoria} alt=""/>
      </div>
      <div className="Ouvidoria--content">
        <div className="Ouvidoria--title">Ouvidoria do Ministério Público do Estado do Rio de Janeiro</div>
        <div className="Ouvidoria--button">
          <a href="https://www.mprj.mp.br/comunicacao/ouvidoria/formulario" target="_blank" rel="noopener noreferrer">
            Faça aqui a sua solicitação
          </a>
        </div>
      </div>
    </div>
  )
}

export default OuvidoriaBox