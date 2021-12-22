import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const ReactSlick = props => {
  const {restaurantImageDetails} = props
  const {imageUrl} = restaurantImageDetails

  return (
    <div className="slider-container">
      <img src={imageUrl} alt="offers" className="image" />
    </div>
  )
}

export default ReactSlick
