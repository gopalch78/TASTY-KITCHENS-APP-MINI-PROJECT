import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div>
    <img
      src=" https://res.cloudinary.com/dybwc1zda/image/upload/v1638691850/erroring_1not-found_vnsklc.png"
      alt="not found"
      className="not-found-image"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-paragraph">
      We are sorry, the page you requested could not be found.
      <br />
      Please go back to the home page
    </p>
    <div className="home-container">
      <Link to="/">
        <button type="button" className="home-page-button">
          Home Page
        </button>
      </Link>
    </div>
  </div>
)
export default NotFound
