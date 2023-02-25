import React from 'react'
import { products } from '../../data';
import { ImStarEmpty, ImStarFull, ImStarHalf } from 'react-icons/im'
import { Link } from 'react-router-dom';

const Products = () => {
  return (
    <section className='product'>
      <div className="container">
        <div className="product__container">
          <div className='product__wrapper'>
            {products.map(({ id, icon, category, name, location, rating }) => {
              // Calculate the number of full stars to display
              const fullStars = Math.floor(rating);
              // Calculate the number of half stars to display
              const hasHalfStar = rating % 1 !== 0;
              // Calculate the number of empty stars to display
              const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
              
              return (
                <div className="product__value" key={id}>
                  <img src={icon} alt="icon" />
                  <Link to={`/business/${id}`}>
                  <h4>{name}</h4>
                  </Link>
                  <p>{category}</p>
                  <small>{location}</small>
                  <div className="rating">
                    {[...Array(fullStars)].map((_, index) => (
                      <ImStarFull key={index} />
                    ))}
                    {hasHalfStar && <ImStarHalf />}
                    {[...Array(emptyStars)].map((_, index) => (
                      <ImStarEmpty key={index} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Products;
