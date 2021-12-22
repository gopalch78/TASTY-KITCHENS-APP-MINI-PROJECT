import {Link} from 'react-router-dom'

import './index.css'

const PaymentSuccessful = () => (
  <div>
    <img
      src="https://res.cloudinary.com/dybwc1zda/image/upload/v1638693832/Vector_correct-tick_vtdzwv.png"
      alt="correct-tick"
      className="correct"
    />
    <h1 className="payment-heading">Payment Successful</h1>
    <p className="payment-paragraph">
      Thank you for ordering Your payment is successfully completed
    </p>
    <div className="home-page-container">
      <Link to="/">
        <button type="button" className="go-to-button">
          Go To Home Page
        </button>
      </Link>
    </div>
  </div>
)

export default PaymentSuccessful
