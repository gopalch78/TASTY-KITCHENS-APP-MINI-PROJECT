import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import Header from '../Header'

import ReactSlider from '../RestaurantOffers'

import Footer from '../Footer'

import PopularRestaurants from '../PopularRestaurants'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <div className="home-container">
      <div className="home-sub-container">
        <Header />
        <ReactSlider />
      </div>
      <PopularRestaurants />
      <Footer />
    </div>
  )
}

export default Home
