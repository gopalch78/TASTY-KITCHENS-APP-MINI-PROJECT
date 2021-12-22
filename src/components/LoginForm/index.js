import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    showSubmitError: false,
    showUserNameError: false,
    showPasswordError: false,
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  validatePassword = () => {
    const {password} = this.state

    return password !== ''
  }

  validateUserName = () => {
    const {username} = this.state

    return username !== ''
  }

  onBlurUserName = () => {
    const isValidUserName = this.validateUserName()

    this.setState({showUserNameError: !isValidUserName})
  }

  onBlurPassword = () => {
    const isValidPassword = this.validatePassword()

    this.setState({showPasswordError: !isValidPassword})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderPasswordField = () => {
    const {password, showPasswordError} = this.state
    const className = showPasswordError
      ? 'password-input-field error-field'
      : 'password-input-field'
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          value={password}
          className={className}
          onChange={this.onChangePassword}
          placeholder="Password"
          onBlur={this.onBlurPassword}
          autoComplete="on"
        />
        {showPasswordError && (
          <p className="error-message-1">Please Provide Valid Password</p>
        )}
      </>
    )
  }

  renderUsernameField = () => {
    const {username, showUserNameError} = this.state
    const className = showUserNameError
      ? 'username-input-field error-field'
      : 'username-input-field'
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="username"
          id="username"
          value={username}
          className={className}
          onChange={this.onChangeUserName}
          placeholder="Username"
          onBlur={this.onBlurUserName}
        />
        {showUserNameError && <p className="error-message-1">Required</p>}
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="Tasty-Kitchen-login-form-container">
        <div>
          <form
            onSubmit={this.onSubmitForm}
            className="Tasty-kitchen-form-container"
            autoComplete="off"
          >
            <div className="image-container">
              <img
                src="https://res.cloudinary.com/dybwc1zda/image/upload/v1638607247/Vectortasty-kitchen-website-logo_rsq7qh.png "
                alt="website logo "
                className="Tasty-Kitchen-website-logo"
              />
              <h1 className="Tasty-Kitchen-website-Heading">Tasty Kitchens</h1>
            </div>
            <div className="mobile-image-container">
              <img
                src="https://res.cloudinary.com/dybwc1zda/image/upload/v1638611751/Rectangle_1456tasty-kitchen-website-image_mxjsd8.png"
                alt="website-logo"
                className="Tasty-Kitchen-website-logo-mobile"
              />
            </div>
            <h1 className="tasty-kitchen-Login-heading">Login</h1>
            <div className="Tasty-Kitchen-input-container">
              {this.renderUsernameField()}
            </div>
            <div className="Tasty-Kitchen-input-container">
              {this.renderPasswordField()}
            </div>
            <button type="submit" className="Tasty-kitchen-Login-button">
              Login
            </button>
            {showSubmitError && <p className="error-message">{errorMsg}</p>}
          </form>
        </div>
        <div className="side-side-container">
          <img
            src="https://res.cloudinary.com/dybwc1zda/image/upload/v1638611751/Rectangle_1456tasty-kitchen-website-image_mxjsd8.png"
            alt="website login"
          />
        </div>
      </div>
    )
  }
}
export default LoginForm
