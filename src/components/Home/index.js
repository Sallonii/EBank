import './index.css'

import Cookies from 'js-cookie'

const Home = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  return (
    <div className="home-main-container">
      <div className="header-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
        />
        <button type="button" className="logout-button" onClick={onLogout}>
          Logout
        </button>
      </div>
      <div className="content-container">
        <h1>Your Flexibility, Our Excellence</h1>
        <img
          alt="digital card"
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
        />
      </div>
    </div>
  )
}

export default Home
