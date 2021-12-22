import {BsFilterRight} from 'react-icons/bs'

import './index.css'

const ProductHeader = props => {
  const {changeSortBy, activeOptionId, sortByOptions} = props

  const onChangeSortBy = event => {
    changeSortBy(event.target.value)
  }
  return (
    <div className="products-header">
      <div className="product-heading-container">
        <h1 className="products-list-heading">Popular Restaurants</h1>
        <p>
          Select Your favourite restaurant special dish and make your day
          happy...
        </p>
      </div>
      <div className="sort-by-container">
        <BsFilterRight className="sort-by-icon" />
        <p className="sort-by">Sort By</p>
        <select
          className="sort-by-select"
          value={activeOptionId}
          onChange={onChangeSortBy}
        >
          {sortByOptions.map(eachOption => (
            <option
              key={eachOption.optionId}
              value={eachOption.optionId}
              className="select-option"
            >
              {eachOption.displayText}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
export default ProductHeader
