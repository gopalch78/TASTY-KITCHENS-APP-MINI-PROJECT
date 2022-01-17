import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Header extends Component {
  state = {isMobileMenuClicked: false}

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  onClickMenuBar = () => {
    this.setState(prev => ({isMobileMenuClicked: !prev.isMobileMenuClicked}))
  }

  onCloseClicked = () => {
    this.setState(prev => ({isMobileMenuClicked: !prev.isMobileMenuClicked}))
  }

  render() {
    const {isMobileMenuClicked} = this.state
    return (
      <>
        <nav className="nav-header">
          <div className="desktop-container">
            <div className="image-heading-container">
              <div className="image-container">
                <img
                  src="https://res.cloudinary.com/dybwc1zda/image/upload/v1638607247/Vectortasty-kitchen-website-logo_rsq7qh.png"
                  alt="website-logo"
                  className="desktop-logo"
                />
                <p className="desktop-heading">Tasty Kitchen</p>
              </div>
            </div>
            <ul className="desktop-un-order-list-container">
              <li className="desktop-home-list-item">
                <Link to="/" className="link desktop-list-item-home">
                  Home
                </Link>
              </li>
              <li className="desktop-cart-list-item">
                <Link to="/cart" className="link desktop-list-item-cart">
                  Cart
                </Link>
              </li>
              <li className="desktop-btn-list-item">
                <button
                  type="button"
                  onClick={this.onClickLogout}
                  className="desktop-logout-button"
                >
                  Logout
                </button>
              </li>
            </ul>
            <div className="hamberger-menu-container">
              <button type="button" className="nav-mobile-btn">
                <img
                  src="https://res.cloudinary.com/nsp/image/upload/v1635332660/tastyKitchens/menu_1x_fcu8zv.png"
                  alt="nav menu"
                  className="nav-bar-image"
                  onClick={this.onClickMenuBar}
                />
              </button>
            </div>
          </div>
        </nav>
        <div className="mobile-container">
          {isMobileMenuClicked && (
            <div className="nav-mobile-only-menu">
              <div className="nav-menu-mobile">
                <div className="nav-menu-container">
                  <ul className="nav-menu-list-mobile">
                    <li className="nav-menu-item-mobile">
                      <Link to="/" className="nav-link-home">
                        Home
                      </Link>
                    </li>

                    <li className="nav-menu-item-mobile">
                      <Link to="/cart" className="nav-link-cart">
                        Cart
                      </Link>
                    </li>
                  </ul>
                  <button
                    type="button"
                    className="logout-btn-mobile"
                    onClick={this.onClickLogout}
                  >
                    Logout
                  </button>
                </div>
                <img
                  src="https://res.cloudinary.com/nsp/image/upload/v1635332590/tastyKitchens/Shape_vud3fu.png"
                  alt="nav close"
                  className="nav-bar-image-close"
                  onClick={this.onCloseClicked}
                />
              </div>
            </div>
          )}
        </div>
      </>
    )
  }
}

export default withRouter(Header)
