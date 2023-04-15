import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', isError: false}

  submitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 7})
    const {history} = this.props
    history.replace('/')
  }

  submitFailure = errorMsg => {
    this.setState({errorMsg, isError: true})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const apiUrl = 'https://apis.ccbp.in/login'
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.submitSuccess(data.jwt_token)
    } else {
      this.submitFailure(data.error_msg)
    }
  }

  updateUsername = event => {
    this.setState({username: event.target.value})
  }

  updatePassword = event => {
    this.setState({password: event.target.value})
  }

  renderUsernameInputField = () => {
    const {username} = this.state
    return (
      <>
        <label htmlFor="username" className="label">
          USERNAME
        </label>
        <input
          value={username}
          type="text"
          id="username"
          onChange={this.updateUsername}
          className="input"
          placeholder="Username"
        />
      </>
    )
  }

  renderPasswordInputField = () => {
    const {password} = this.state
    return (
      <>
        <label htmlFor="password" className="label">
          PASSWORD
        </label>
        <input
          value={password}
          onChange={this.updatePassword}
          className="input"
          type="password"
          id="password"
          placeholder="Password"
        />
      </>
    )
  }

  render() {
    const {errorMsg, isError} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="submit-form-container">
        <form onSubmit={this.onSubmitForm} className="form-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <div className="input-container">
            {this.renderUsernameInputField()}
          </div>
          <div className="input-container">
            {this.renderPasswordInputField()}
          </div>
          <button className="login-btn" type="submit">
            Login
          </button>
          {isError && <p className="error-msg">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}
export default Login
