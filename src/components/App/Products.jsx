import React, { useState, useEffect } from 'react';
import { getBusiness } from '../../apis/BusinessApi';
import { ImStarEmpty, ImStarFull, ImStarHalf } from 'react-icons/im';
import { Link } from 'react-router-dom';
import  Logo from '../../assets/pplogo.png'

const Products = () => {
  const [business, setBusiness] = useState([]);
  const [showCount, setShowCount] = useState(8); 
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const response = await getBusiness({ pageParam: 0 });
        setBusiness(response);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching business:', error);
      }
    };
    fetchBusiness();
  }, []);

  const handleLoadMore = () => {
    setShowCount(prevCount => prevCount + 8);
  };

  if (loading) {
    return <div className='spinner_container'>
      <img src={Logo} />
    </div>;
  }

  return (
    <section className='product'>
      <div className='container'>
        <div className='product__container'>
          <div className='product__wrapper'>
            {business.map(({ id, image, name, category, location, rating }) => {
              // Calculate the number of full stars to display
              const fullStars = Math.floor(rating);
              // Calculate the number of half stars to display
              const hasHalfStar = rating % 1 !== 0;
              // Calculate the number of empty stars to display
              const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

              return (
                <div className='product__value' key={id}>
                  <img src={`https://api.usepurplepages.com/${image}`} alt='icon' />
                  <Link to={`/business/${id}`}>
                    <h4>{name}</h4>
                  </Link>
                  <p>{category}</p>
                  <small>{location}</small>
                  <div className='rating'>
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
        {showCount < business.length && (
          <div className='product__load-more'>
            <button onClick={handleLoadMore}>Load More....</button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;