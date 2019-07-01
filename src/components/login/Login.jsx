import React from 'react'
import Api from '../Api/Api'

import './Login.scss'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = { email: '', password: '', save: false }
  }

  loginCallback(jwt) {
    if (jwt) {
      console.log('Done, ', jwt)
    } else {
      console.log('error')
    }
  }

  login(event) {
    // blocks default page reload
    event.preventDefault()

    const { email, password } = this.state
    Api.login(this.loginCallback, email, password)
    this.props.history.push('/home')
  }

  /**
   * Updates the state with the field's new value
   * @param  {event} event DOM's default onChange event
   * @param  {string} type  'email' or 'password'
   * @return {void}
   */
  handleChange(event, type) {
    const updatedState = {}
    updatedState[type] = event.target.value
    this.setState(updatedState)
  }

  /**
   * Inverts the current state value of the save field
   * @return {void}
   */
  handleSavingChange() {
    this.setState((prevState) => {
      const save = !prevState.save
      return { save }
    })
  }

  render() {
    const { email, password } = this.state
    return (
      <div className="wrapper">
        <div className="Login-container">
          <div className="Login-banner">
            <p>image goes here</p>
          </div>
          <form className="Login-form" onSubmit={event => this.login(event)}>
            <div className="Login-inputs">
              <input
                className="Login-input"
                placeholder="Email"
                type="email"
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
              <label htmlFor="save">
                <input type="checkbox" id="save" onChange={() => this.handleSavingChange()} />
                Salvar senha
              </label>
            </div>
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
