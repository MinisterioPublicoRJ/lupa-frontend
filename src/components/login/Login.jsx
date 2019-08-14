import React from 'react'
import Api from '../api/Api'

import './Login.scss'
import Logo from '../icons/logo'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = { email: '', password: '', error: false }
    this.loginCallback = this.loginCallback.bind(this)
  }

  loginCallback(response) {
    if (response.status === 200) {
      const { history, location } = this.props
      localStorage.setItem('token', response.data)
      const navUrl = (location.state && location.state.prevUrl) ? location.state.prevUrl : '/EST/33'
      history.push(navUrl)
    } else {
      this.setState({error: true})
    }
    // colocar mensagem de erro aqui
  }

  login(event) {
    // blocks default page reload
    event.preventDefault()

    const { email, password } = this.state
    Api.login(this.loginCallback, email, password)
  }

  /**
   * Updates the state with the field's new value
   * @param  {event} event DOM's default onChange event
   * @param  {string} type  'email' or 'password'
   * @return {void}
   */
  handleChange(event, type) {
    const updatedState = {}
    updatedState[type] = event.target.value.toLocaleLowerCase()
    this.setState(updatedState)
  }

  render() {
    const { email, password, error } = this.state
    return (
      <div className="wrapper">
        <div className="Login-container">
          <div className="Login-banner">
            <Logo width="100%" />
          </div>
          <form className="Login-form" onSubmit={event => this.login(event)}>
            <div className="Login-inputs">
              <input
                className="Login-input"
                placeholder="Usuário"
                type="text"
                value={email}
                onChange={event => this.handleChange(event, 'email')}
                required
              />
              <input
                className="Login-input"
                placeholder="Senha"
                type="password"
                value={password}
                onChange={event => this.handleChange(event, 'password')}
                required
              />
            </div>
            {error ? <p style={{color: "red"}}>Erro ao acessar o sistema</p> : null}
            <div className="Login-container-button">
              <button type="submit">Entrar</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
