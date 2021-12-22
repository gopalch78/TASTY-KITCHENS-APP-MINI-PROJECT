import {Component} from 'react'
import Header from '../Header'
import Footer from '../Footer'
import EmptyCart from '../EmptyCart'
import CartItem from '../CartItem'
import PaymentSuccessful from '../PaymentSuccessful'
import './index.css'

class Cart extends Component {
  state = {cartData: [], orderStatus: false}

  componentDidMount() {
    const cartData = localStorage.getItem('cartData')
    const parseCartData = JSON.parse(cartData)
    if (parseCartData === null || parseCartData.length === 0) {
      this.setState({cartStatus: false})
    } else {
      const cartAmounts = []

      if (parseCartData.length > 0) {
        parseCartData.forEach(eachItem => {
          const totalItemAmount = eachItem.cost * eachItem.quantity
          cartAmounts.push(totalItemAmount)
        })
        const totalCartAmount = cartAmounts.reduce(
          (previousScore, currentScore) => previousScore + currentScore,
        )
        this.setState({totalCartAmount})
      }
      this.setState({cartData: parseCartData, cartStatus: true})
    }
  }

  onClickPlaceOrder = () => {
    localStorage.removeItem('cartData')
    this.setState({orderStatus: true, cartData: []})
  }

  onChangeTotalAmount = value => {
    this.setState(prev => ({totalCartAmount: prev.totalCartAmount + value}))
  }

  updateCartData = () => {
    const {cartData} = this.state
    if (cartData.length > 0) {
      localStorage.setItem('cartData', JSON.stringify(cartData))
    } else {
      localStorage.removeItem('cartData')
    }
  }

  onDeleteCartItem = id => {
    const {cartData} = this.state
    const updatedCartData = cartData.filter(eachItem => eachItem.id !== id)
    this.setState({cartData: updatedCartData}, this.updateCartData)
  }

  render() {
    const {cartData, cartStatus, orderStatus, totalCartAmount} = this.state

    return (
      <>
        {cartStatus && totalCartAmount > 0 ? (
          <>
            {!orderStatus ? (
              <div>
                <Header />
                <div className="cart-container">
                  <li className="cart-desktop-list-header">
                    <p className="list-header-name1">Item</p>
                    <p className="list-header-name2">Quantity</p>
                    <p className="list-header-name3">Price</p>
                  </li>
                  {cartData.map(eachItem => (
                    <CartItem
                      eachItem={eachItem}
                      key={eachItem.id}
                      onChangeTotalAmount={this.onChangeTotalAmount}
                      onDeleteCartItem={this.onDeleteCartItem}
                    />
                  ))}
                  <hr className="cart-line" />
                  <div className="total-cart-amount-container">
                    <h1 className="total-order-text">Order Total:</h1>
                    <p testid="total-price" className="total-order-amount">
                      ₹{totalCartAmount}
                    </p>
                  </div>
                  <div className="place-order-button-container">
                    <button
                      type="button"
                      className="cart-place-order-button"
                      onClick={this.onClickPlaceOrder}
                    >
                      Place Order
                    </button>
                  </div>
                </div>

                <Footer />
              </div>
            ) : (
              <>
                <Header />
                <PaymentSuccessful />
              </>
            )}
          </>
        ) : (
          <div>
            <Header />
            <EmptyCart />
          </div>
        )}
      </>
    )
  }
}

export default Cart
