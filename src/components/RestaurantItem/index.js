import {Link} from 'react-router-dom'

import {BsFillStarFill} from 'react-icons/bs'

import './index.css'

const RestaurantItem = props => {
  const {restaurantItemDetails} = props
  const {
    name,
    imageUrl,
    cuisine,
    rating,
    id,
    totalReviews,
  } = restaurantItemDetails

  return (
    <li testid="restaurant-item" className="restaurant-item">
      <Link to={`/restaurant/${id}`} className="link-item">
        <img
          src={imageUrl}
          alt="restaurant"
          className="restaurant-item-image"
        />
        <div>
          <h1 className="restaurant-name">{name}</h1>
          <p className="restaurant-cuisine">{cuisine}</p>
          <div className="rating-container">
            <BsFillStarFill className="icon1" />
            <p className="rating">{rating}</p>
            <p className="reviews">({totalReviews}rating)</p>
          </div>
        </div>
      </Link>
    </li>
  )
}
export default RestaurantItem
