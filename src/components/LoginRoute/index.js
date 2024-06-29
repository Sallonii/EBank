import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class LoginRoute extends Component {
  state = {userId: '', pin: '', isInvalid: false, errorMsg: ''}

  onChangingUserId = event => {
    this.setState({userId: event.target.value})
  }

  onChangePin = event => {
    this.setState({pin: event.target.value})
  }

  onSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })

    history.replace('/')
  }

  onFailure = errorMsg => {
    this.setState({isInvalid: true, errorMsg})
  }

  onLogin = async event => {
    event.preventDefault()

    const {userId, pin} = this.state

    const details = {user_id: userId, pin}

    const options = {
      method: 'POST',
      body: JSON.stringify(details),
    }

    const api = `https://apis.ccbp.in/ebank/login`

    const response = await fetch(api, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  render() {
    const {isInvalid, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-main-container">
        <div className="card-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="login-page-image"
          />
          <form className="form-container" onSubmit={this.onLogin}>
            <h1>Welcome Back</h1>
            <div className="input-container">
              <label htmlFor="userId" className="label-element">
                User ID
              </label>
              <input
                id="userId"
                placeholder="Enter User ID"
                type="text"
                onChange={this.onChangingUserId}
              />
            </div>
            <div className="input-container">
              <label htmlFor="pin" className="label-element" type="password">
                PIN
              </label>
              <input
                id="pin"
                placeholder="Enter PIN"
                type="password"
                onChange={this.onChangePin}
              />
            </div>
            <button type="submit" className="login-btn">
              Login
            </button>
            {isInvalid && <p className="error-msg">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginRoute
