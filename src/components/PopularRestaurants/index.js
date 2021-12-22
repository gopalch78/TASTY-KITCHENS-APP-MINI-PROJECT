import {Component} from 'react'

import Cookies from 'js-cookie'

import {BiChevronRightSquare, BiChevronLeftSquare} from 'react-icons/bi'

import Loader from 'react-loader-spinner'

import ProductHeader from '../ProductHeader'

import RestaurantItem from '../RestaurantItem'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class PopularRestaurants extends Component {
  state = {
    popularRestaurantsData: ' ',
    apiStatus: apiStatusConstants.initial,
    activeOptionId: sortByOptions[1].value,
    totalPages: 0,
    activePage: 1,
  }

  componentDidMount() {
    this.getPopularRestaurants()
  }

  getPopularRestaurants = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {activeOptionId, activePage} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const limit = 9
    const offset = (activePage - 1) * limit
    const restaurantUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${activeOptionId}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(restaurantUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const totalRestaurants = fetchedData.total
      const totalPages = Math.ceil(totalRestaurants / limit)
      const updatedData = fetchedData.restaurants.map(restaurant => ({
        name: restaurant.name,
        cuisine: restaurant.cuisine,
        id: restaurant.id,
        imageUrl: restaurant.image_url,
        rating: restaurant.user_rating.rating,
        totalReviews: restaurant.user_rating.total_reviews,
      }))

      this.setState({
        popularRestaurantsData: updatedData,
        apiStatus: apiStatusConstants.success,
        totalPages,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  changeSortBy = activeOptionId => {
    this.setState({activeOptionId}, this.getPopularRestaurants)
  }

  onIncreasePageNumber = () => {
    const {activePage} = this.state
    if (activePage < 4) {
      this.setState(
        prevState => ({
          activePage: prevState.activePage + 1,
        }),
        this.getPopularRestaurants,
      )
    }
  }

  onDecreasePageNumber = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState(
        prevState => ({
          activePage: prevState.activePage - 1,
        }),
        this.getPopularRestaurants,
      )
    }
  }

  renderLoadingView = () => (
    <div testid="restaurants-list-loader">
      <Loader type="TailSpin" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderPopularRestaurants = () => {
    const {
      activePage,
      totalPages,
      popularRestaurantsData,
      activeOptionId,
    } = this.state
    return (
      <div>
        <ProductHeader
          activeOptionId={activeOptionId}
          sortByOptions={sortByOptions}
          changeSortBy={this.changeSortBy}
        />
        <hr />
        <>
          <ul className="ul-container">
            {popularRestaurantsData.map(eachItem => (
              <RestaurantItem
                key={eachItem.id}
                list={eachItem}
                restaurantItemDetails={eachItem}
              />
            ))}
          </ul>
        </>
        <div className="pagination-container">
          <button
            type="button"
            onClick={this.onDecreasePageNumber}
            testid="pagination-left-button"
          >
            <BiChevronLeftSquare size={20} />
          </button>
          <p testid="active-page-number">{activePage}</p>
          <span>of </span>
          <p>{totalPages}</p>
          <button
            type="button"
            onClick={this.onIncreasePageNumber}
            testid="pagination-right-button"
          >
            <BiChevronRightSquare size={20} />
          </button>
        </div>
      </div>
    )
  }

  renderRestaurants = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderPopularRestaurants()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderRestaurants()}</div>
  }
}
export default PopularRestaurants
