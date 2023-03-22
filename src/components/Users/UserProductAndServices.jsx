import React from 'react'
import { productsandservice } from '../../data';
import { Link } from 'react-router-dom';

const UserProductAndService = () => {
  return (
    
     
        <div className="user__productandservice__container">
          <div className='user__productandservice__wrapper'>
            {productsandservice.map(({ id, icon, price, name, frame}) => {
              
              
              return (
                <div className="user__productandservice__value" key={id}>
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

export default UserProductAndService;
