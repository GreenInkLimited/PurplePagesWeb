import React, { useState } from 'react';
import { products } from '../../data';

const Filter = () => {
  const [categoryVal, setCategoryVal] = useState('');
  const [locationVal, setLocationVal] = useState('');
  const [ratingVal, setRatingVal] = useState('');

  const uniqueCategories = Array.from(new Set(products.map(product => product.category)));
  const uniqueLocations = Array.from(new Set(products.map(product => product.location)));
  const uniqueRatings = Array.from(new Set(products.map(product => product.rating)));

  const handleCategoryChange = (e) => {
    setCategoryVal(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocationVal(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRatingVal(e.target.value);
  };

  const filteredProducts = products.filter((product) => {
    const categoryMatch = categoryVal === '' || product.category.toLowerCase().includes(categoryVal.toLowerCase());
    const locationMatch = locationVal === '' || product.location.toLowerCase().includes(locationVal.toLowerCase());
    return categoryMatch && locationMatch;
  });

  return (
    <div className='container filter__container'>
      <p>Filter by:</p>
      <div className="main__filter">
        <input
          list="categories"
          onChange={handleCategoryChange}
          value={categoryVal}
          placeholder="Category"
        />
        <datalist id="categories">
          {uniqueCategories.map((category) => <option key={category} value={category} />)}
        </datalist>
        </div>
        <div className="main__filter">
        <input
          list="locations"
          onChange={handleLocationChange}
          value={locationVal}
          placeholder="Location"
        />
        <datalist id="locations">
          {uniqueLocations.map((location) => <option key={location} value={location} />)}
        </datalist>
      </div>

      <div className="main__filter">
        <input
          list="ratings"
          onChange={handleLocationChange}
          value={locationVal}
          placeholder="All Ratings"
        />
        <datalist id="ratings">
          {uniqueRatings.map((rating) => <option key={rating} value={rating} />)}
        </datalist>
      </div>

      {/* Display filtered products 
      <div>
        {filteredProducts.map((product) => (
          <div key={product.id}>
            <p>{product.category}</p>
            <p>{product.name}</p>
            <p>{product.location}</p>
          </div>
        ))}
      </div>
      */}
    </div>
  );
};

export default Filter;
