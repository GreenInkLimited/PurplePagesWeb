import React, { useState } from 'react';
import { products } from '../../data';
import { AddBusiness } from '../../apis/BusinessApi';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { TiArrowUnsorted } from 'react-icons/ti'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useQuery } from 'react-query';

const Filter = () => {
  const [categoryVal, setCategoryVal] = useState('');
  const [locationVal, setLocationVal] = useState('');
  const [ratingVal, setRatingVal] = useState('');

  const [isActive, setIsActive] = useState(false)
  const [selected, setSelected] = useState("");

  const [isActiveLocation, setIsActiveLocation] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState("");

  const [isActiveCategory, setIsActiveCategory] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("");


  const options = [5, 4, 3, 2, 1, 0]
  const locations = ['Abuja', 'Lagos', 'Oyo']
  const categories = ['Fashion', 'Education']


  const uniqueCategories = Array.from(new Set(products.map(product => product.category)));
  const uniqueLocations = Array.from(new Set(products.map(product => product.location)));
  const uniqueRatings = Array.from(new Set(products.map(product => product.rating)));

  

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
      
        
<Formik >
  <Form>
    <div className='filter__container-row'>
      <p>Filter by:</p>
    <Field name="business_type">
      {({ field }) => (
    <div className="dropdown__filter">
      <div
        className="dropdown__filter-btn"
        onClick={() => setIsActiveCategory(!isActiveCategory)}
      >
        {selectedCategory || field.value || "Categories"} {/* Add the placeholder text */}
        <div className="dropdown__filter-icons">
        {isActiveCategory ? <TiArrowUnsorted className="dropdown__filter-icon"/> : <TiArrowUnsorted className="dropdown-icon"/>}
        </div>
      </div>
      {isActiveCategory && (
        <div className="dropdown__filter-content">
          {categories.map((option) => (
            <div
              key={option}
              onClick={() => {
                setSelectedCategory(option);
                setIsActiveCategory(false);
                field.onChange({ target: { value: option } });
              }}
              className="dropdown__filter-item"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  )}
  </Field>

  <Field name="business_type">
      {({ field }) => (
    <div className="dropdown__filter">
      <div
        className="dropdown__filter-btn"
        onClick={() => setIsActiveLocation(!isActiveLocation)}
      >
        {selectedLocation || field.value || "Locations"} {/* Add the placeholder text */}
        <div className="dropdown__filter-icons">
        {isActiveLocation ? <TiArrowUnsorted className="dropdown__filter-icon"/> : <TiArrowUnsorted className="dropdown-icon"/>}
        </div>
      </div>
      {isActiveLocation && (
        <div className="dropdown__filter-content">
          {locations.map((option) => (
            <div
              key={option}
              onClick={() => {
                setSelectedLocation(option);
                setIsActiveLocation(false);
                field.onChange({ target: { value: option } });
              }}
              className="dropdown__filter-item"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  )}
  </Field>

    <Field name="business_type">
      {({ field }) => (
    <div className="dropdown__filter">
      <div
        className="dropdown__filter-btn"
        onClick={() => setIsActive(!isActive)}
      >
        {selected || field.value || "Ratings"} {/* Add the placeholder text */}
        <div className="dropdown__filter-icons">
        {isActive ? <TiArrowUnsorted className="dropdown__filter-icon"/> : <TiArrowUnsorted className="dropdown-icon"/>}
        </div>
      </div>
      {isActive && (
        <div className="dropdown__filter-content">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => {
                setSelected(option);
                setIsActive(false);
                field.onChange({ target: { value: option } });
              }}
              className="dropdown__filter-item"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  )}
  </Field>
  </div>
</Form>
</Formik>

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
