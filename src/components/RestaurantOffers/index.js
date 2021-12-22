import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import ReactSlick from '../RestaurantOfferItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class ReactSlider extends Component {
  state = {
    sliderImages: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getSliderImages()
  }

  getSliderImages = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list/offers`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.offers.map(offer => ({
        id: offer.id,
        imageUrl: offer.image_url,
      }))
      this.setState({
        sliderImages: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderSliderListView = () => {
    const {sliderImages} = this.state
    const settings = {
      dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: true,
    }

    return (
      <ul>
        <Slider {...settings}>
          {sliderImages.map(each => (
            <li key={each.id}>
              <ReactSlick key={each.id} restaurantImageDetails={each} />
            </li>
          ))}
        </Slider>
      </ul>
    )
  }

  renderLoadingView = () => (
    <div testid="restaurants-offers-loader" className="slider-loader-container">
      <Loader type="Oval" color="#F7931E" height="50" width="50" />
    </div>
  )

  renderAllImages = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSliderListView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div className="slider-container">{this.renderAllImages()}</div>
  }
}

export default ReactSlider
