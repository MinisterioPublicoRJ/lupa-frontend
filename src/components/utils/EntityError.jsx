import React from 'react'

import './EntityError.scss'

function cleanError(errorInfo) {
  let title = 'Ops'
  let body = 'Houve um erro no carregamento desse conteúdo. Tente novamente mais tarde'
  if (errorInfo.message === 'Network Error') {
    title = 'Erro de conexão'
    body = 'Ocorreu um erro com a conexão do servidor. Por favor, tente mais tarde.'
  }
  if (errorInfo.message === 'Request failed with status code 404') {
    title = 'Entidade inválida'
    body = 'O código fornecido não pertence a nenhuma entidade na base de dados.'
  }
  return { title, body }
}

const EntityError = ({ errorInfo }) => {
  const { title, body } = cleanError(errorInfo)
  
  return (
    <div className="Error-container">
      <span className="Error-title">{title}</span>
      <p className="Error-body">{body}</p>
    </div>
  )
}

export default EntityError
