import React from 'react'
import Api from '../Api/Api'

import './Login.scss';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
  }

  loginCallback(jwt) {
    if (jwt) {
      console.log("Done, ", jwt)
    } else {
      console.log("error")
    }
  }

  login(event) {
    // blocks default page reload
    event.preventDefault();

    const { email, password } = this.state;
    Api.login(this.loginCallback, email, password)
  }

  /**
   * Updates the state with the field's new value
   * @param  {event} event DOM's default onChange event
   * @param  {string} type  'email' or 'password'
   * @return {void}
   */
  handleChange(event, type) {
    const updatedState = {};
    updatedState[type] = event.target.value;
    this.setState(updatedState);
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className="wrapper">
        <div className="Login-container">
          <div className="Login-banner">
            <p>image goes here</p>
          </div>
          <form className="Login-form" onSubmit={event => this.login(event)}>
            <div className="Login-inputs">
              <input type="text" value={email} onChange={event => this.handleChange(event, 'email')} />
              <input type="text" value={password} onChange={event => this.handleChange(event, 'password')} />
            </div>
            <button type="submit" className="Login-button">Entrar</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
