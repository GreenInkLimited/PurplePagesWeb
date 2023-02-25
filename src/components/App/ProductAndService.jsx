import React from 'react'
import { productsandservice } from '../../data';
import { Link } from 'react-router-dom';

const ProductAndService = () => {
  return (
    
     
        <div className="productandservice__container">
          <div className='productandservice__wrapper'>
            {productsandservice.map(({ id, icon, price, name, frame}) => {
              
              
              return (
                <div className="productandservice__value" key={id}>
                  <img src={icon} alt="icon" />
                  <Link to={`/singleproduct/${id}`}>
                  <small>{name}</small>
                  </Link>
                  <p>₦{price}.00</p>
                  <img className='frame' src={frame} alt="" />
                </div>
              );
            })}
          </div>
        </div>
      
    
  );
}

export default ProductAndService;
