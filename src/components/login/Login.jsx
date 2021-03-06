import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
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
      const { history } = this.props
      localStorage.setItem('token', response.data)
      history.goBack()
    } else {
      this.setState({ error: true })
    }
    this.setState({ loading: false })
  }

  login(event) {
    // blocks default page reload
    this.setState({ loading: true })
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
    const {
      email, password, error, loading,
    } = this.state
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
            {error ? <p style={{ color: 'red' }}>Erro ao acessar o sistema</p> : null}
            <div className="Login-container-button">
              <button type="submit">
                {loading ? <FontAwesomeIcon className="Search-icon" icon={faSpinner} spin /> : 'Entrar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
