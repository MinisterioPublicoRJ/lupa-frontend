import React from 'react'
import Api from '../Api/Api'

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
      <div>
        <form onSubmit={event => this.login(event)}>
          <input type="text" value={email} onChange={event => this.handleChange(event, 'email')} />
          <input type="text" value={password} onChange={event => this.handleChange(event, 'password')} />
          <button type="submit">Entrar</button>
        </form>
      </div>
    );
  }
}

export default Login;
