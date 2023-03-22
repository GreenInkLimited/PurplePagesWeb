import React from 'react'
import { productsandservice } from '../../data';
import { Link } from 'react-router-dom';
import ExternalLinkLine from '../../assets/ExternalLinkLine.png'
import Delete from '../../assets/Delete.png'

const ProductWishlist = () => {
  return (
    
     
        <div className="productwishlist__container">
          <div className='productwishlist__wrapper'>
            {productsandservice.map(({ id, icon, price, name, frame}) => {
              
              
              return (
                <div className="productwishlist__value" key={id}>
                  <div className='productwishlist__right'>
                  <img src={icon} alt="icon" />
                  <div>
                  <Link to={`/singleproduct/${id}`}>
                  <p className='product-wishlist__name'>{name}</p>
                  </Link>
                  <p><b>₦{price}.00</b></p>
                  </div>
                  </div>
                  <div className='productwishlist__left'>
                  <img className='productwishlist__frame' src={ExternalLinkLine} alt="" />
                  <img className='productwishlist__frame' src={Delete} alt="" />
                  </div>
                  </div>
              );
            })}
          </div>
        </div>
      
    
  );
}

export default ProductWishlist
