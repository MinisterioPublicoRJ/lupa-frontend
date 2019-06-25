import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
  }

  login(event) {
    event.preventDefault();
    const { email, password } = this.state;
    console.log('it worked!', email, password);
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
