import {Component} from 'react'

import {BiRupee} from 'react-icons/bi'

import {AiFillStar} from 'react-icons/ai'

import './index.css'

class RestaurantFoodItem extends Component {
  state = {itemQuantity: 0, isAddButtonClicked: false}

  componentDidMount() {
    const {foodItemData} = this.props
    const {id} = foodItemData
    const cartData = localStorage.getItem('cartData')
    const parsedData = JSON.parse(cartData)
    if (parsedData === null) {
      this.setState({
        isAddButtonClicked: false,
        itemQuantity: 0,
      })
    } else {
      const presentCartData = parsedData.filter(eachItem => eachItem.id === id)
      if (presentCartData.length > 0) {
        this.setState({
          isAddButtonClicked: true,
          itemQuantity: presentCartData[0].quantity,
        })
      }
    }
  }

  onClickAddToCart = () => {
    this.setState(
      {isAddButtonClicked: true, itemQuantity: 1},
      this.updateLocalStorage,
    )
  }

  updateLocalStorage = () => {
    const {itemQuantity, isAddButtonClicked} = this.state
    const {foodItemData} = this.props
    const {name, cost, imageUrl, id} = foodItemData
    const localCartData = localStorage.getItem('cartData')
    const parsedCartData = JSON.parse(localCartData)
    if (parsedCartData === null) {
      const updatedParsedData = []
      if (isAddButtonClicked === true && itemQuantity > 0) {
        const cartItemData = {name, cost, imageUrl, id, quantity: itemQuantity}
        updatedParsedData.push(cartItemData)
        localStorage.setItem('cartData', JSON.stringify(updatedParsedData))
      }
    } else {
      const updatedCartData = parsedCartData
      if (isAddButtonClicked === true) {
        const cartItemData = {name, cost, imageUrl, id, quantity: itemQuantity}
        const updatedCart = updatedCartData.filter(
          eachItem => eachItem.id !== id,
        )
        updatedCart.push(cartItemData)
        localStorage.setItem('cartData', JSON.stringify(updatedCart))
      } else {
        const updatedCart = updatedCartData.filter(
          eachItem => eachItem.id !== id,
        )
        localStorage.setItem('cartData', JSON.stringify(updatedCart))
      }
    }
  }

  onDecrementQuantity = () => {
    const {itemQuantity} = this.state
    if (itemQuantity < 2) {
      this.setState(
        {
          itemQuantity: 0,
          isAddButtonClicked: false,
        },
        this.updateLocalStorage,
      )
    } else {
      this.setState(
        prev => ({
          isAddButtonClicked: true,
          itemQuantity: prev.itemQuantity - 1,
        }),
        this.updateLocalStorage,
      )
    }
  }

  onIncrementQuantity = () => {
    const {itemQuantity} = this.state
    const updatedQuantity = itemQuantity + 1
    this.setState(
      {
        itemQuantity: updatedQuantity,
      },
      this.updateLocalStorage,
    )
  }

  renderAddOrIncreaseDecreaseButtons = () => {
    const {itemQuantity, isAddButtonClicked} = this.state
    return itemQuantity > 0 && isAddButtonClicked ? (
      <div>
        <button
          type="button"
          testid="decrement-count"
          onClick={this.onDecrementQuantity}
        >
          -
        </button>
        <p testid="active-count">{itemQuantity}</p>
        <button
          type="button"
          testid="increment-count"
          onClick={this.onIncrementQuantity}
        >
          +
        </button>
      </div>
    ) : (
      <button type="button" onClick={this.onClickAddToCart}>
        Add
      </button>
    )
  }

  renderFoodItem = () => {
    const {foodItemData} = this.props
    const {name, cost, imageUrl, rating} = foodItemData

    return (
      <li className="food-item-container" testid="foodItem">
        <div>
          <img src={imageUrl} alt="restaurant" className="food-image" />
        </div>
        <div>
          <h1 className="food-item-heading">{name}</h1>
          <p className="food-item-cost">
            <BiRupee />
            {cost}
          </p>
          <p className="food-item-rating">
            <AiFillStar className="star-color" />
            {rating}
          </p>
          {this.renderAddOrIncreaseDecreaseButtons()}
        </div>
      </li>
    )
  }

  render() {
    return this.renderFoodItem()
  }
}

export default RestaurantFoodItem
