import {Link} from 'react-router-dom'

import './index.css'

const EmptyCart = () => (
  <div>
    <img
      src="https://res.cloudinary.com/dybwc1zda/image/upload/v1638692844/cooking_1_ggfbqn.png"
      alt="empty cart"
      className="empty-cart"
    />
    <h1 className="empty-cart-heading">No Order Yet!</h1>
    <p className="empty-cart-paragraph">
      Your cart is empty. Add something from the menu.
    </p>
    <div className="order-container">
      <Link to="/">
        <button type="button" className="order-now-button">
          Order Now
        </button>
      </Link>
    </div>
  </div>
)
export default EmptyCart
