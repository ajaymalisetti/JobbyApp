import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="nav-bar">
      <div className="nav-options-container">
        <Link to="/" className="link-item">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="app-logo"
          />
        </Link>
        <ul className="desktop-options-container">
          <Link to="/" className="link-item">
            <li className="header">Home</li>
          </Link>
          <Link to="/jobs" className="link-item">
            <li className="header">Jobs</li>
          </Link>
        </ul>
        <button
          type="button"
          className="desktop-logout-btn"
          onClick={onClickLogout}
        >
          Logout
        </button>
        <ul className="mobile-options-container">
          <Link to="/" className="link-item">
            <li className="icon-item">
              <AiFillHome color="#ffffff" className="icon" />
            </li>
          </Link>
          <Link to="/jobs" className="link-item">
            <li className="icon-item">
              <BsBriefcaseFill color="#ffffff" className="icon" />
            </li>
          </Link>
          <button
            className="mobile-logout-btn"
            onClick={onClickLogout}
            type="button"
          >
            <FiLogOut className="logout-icon" color="#ffffff" />
          </button>
        </ul>
      </div>
    </nav>
  )
}
export default withRouter(Header)
