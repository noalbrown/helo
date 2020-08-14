import React from 'react';

class Auth extends React.Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: ''
    }
  }

  login = () => {
    const { username, password } = this.state;
    axios.post('/auth/login', { username, password }).then(res => {
      this.props.loginUser(res.data);
      this.props.history.push('/dashboard')
    }).catch(err => {
      console.log(err);
      alert('Cannot Login')
    })
  }

  register = () => {
    const { username, password } = this.state;
    axios.post('/auth/register', { username, password }).then(res => {
      this.props.loginUser(res.data);
      this.props.history.push('/dashboard');
    }).catch(err => {
      console.log(err);
      alert('Could Not Register')
    })
  }

  render() {
    const { username, password } = this.state;
    return <div>
      <input name='username' type='text' value={username} placeholder='User Name' />
      <input name='password' type='text' value={password} placeholder='Password' />
      <button onClick={this.login}>Login</button>
      <button onClick={this.register}>Register</button>
    </div>
  }
}

export default Auth;