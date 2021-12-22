import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import {AiFillStar} from 'react-icons/ai'

import {BiRupee} from 'react-icons/bi'

import Header from '../Header'

import RestaurantFoodItem from '../RestaurantFoodItem'

import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class RestaurantDetails extends Component {
  state = {
    RestaurantData: [],
    foodItemsData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getRestaurantDetails()
  }

  getRestaurantDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedRestaurantData = await response.json()
      const updatedRestaurantDetailsData = [fetchedRestaurantData].map(
        each => ({
          rating: each.rating,
          id: each.id,
          name: each.name,
          costForTwo: each.cost_for_two,
          cuisine: each.cuisine,
          imageUrl: each.image_url,
          reviewsCount: each.reviews_count,
          opensAt: each.opens_at,
          location: each.location,
          itemsCount: each.items_count,
        }),
      )
      const foodItemDetailsData = fetchedRestaurantData.food_items.map(
        eachItem => ({
          name: eachItem.name,
          cost: eachItem.cost,
          type: eachItem.food_type,
          imageUrl: eachItem.image_url,
          id: eachItem.id,
          rating: eachItem.rating,
        }),
      )
      this.setState({
        apiStatus: apiStatusConstants.success,
        RestaurantData: updatedRestaurantDetailsData,
        foodItemsData: foodItemDetailsData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailureView = () => (
    <div className="restaurant-error-view-container">
      <img
        src="https://res.cloudinary.com/nsp/image/upload/v1635664104/tastyKitchens/error_1x_csgpog.png"
        alt="restaurants failure"
        className="restaurant-failure-img"
      />
      <h1 className="restaurant-failure-heading-text">Page Not Found</h1>
      <p className="restaurant-failure-description">
        we are sorry, the page you requested could not be found Please go back
        to the homepage
      </p>
      <button className="error-button" type="button">
        Home Page
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" testid="restaurant-details-loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderRestaurantAndFoodItemDetails = () => {
    const {RestaurantData, foodItemsData} = this.state
    const {
      rating,
      name,
      costForTwo,
      cuisine,
      imageUrl,
      reviewsCount,
      location,
    } = RestaurantData[0]

    return (
      <>
        <Header />
        <div className="restaurant-container">
          <div className="restaurant-bg-container">
            <div className="restaurant-image-container">
              <img
                src={imageUrl}
                alt="restaurant"
                className="restaurant-image"
              />
            </div>
            <div className="restaurant-description">
              <h1 className="restaurant-heading">{name}</h1>
              <p className="restaurant-paragraph">{cuisine}</p>
              <p className="restaurant-location">{location}</p>
              <div className="rating-cost-container">
                <div>
                  <p className="restaurant-rating-heading">
                    <AiFillStar /> {rating}
                  </p>
                  <p className="restaurant-review-count-paragraph">
                    {reviewsCount}+Rating
                  </p>
                </div>
                <p className="slash">|</p>
                <div>
                  <p className="restaurant-cost">
                    <BiRupee />
                    {costForTwo}
                  </p>
                  <p className="cost-for-two">Cost for two</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <ul className="restaurant-food-item-list-container">
              {foodItemsData.map(eachFood => (
                <RestaurantFoodItem
                  key={eachFood.id}
                  foodItemData={eachFood}
                  testid="foodItem"
                />
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }

  renderRestaurantDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRestaurantAndFoodItemDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div>
          {this.renderRestaurantDetails()}
          <Footer />
        </div>
      </>
    )
  }
}

export default RestaurantDetails
