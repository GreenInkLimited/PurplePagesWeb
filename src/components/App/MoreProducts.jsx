import React from 'react'
import { productsandservice } from '../../data';
import Frame from '../../assets/Frame.png'
import { Link } from 'react-router-dom';

const MoreProducts = () => {
  const getRandomProducts = () => {
    const randomProducts = productsandservice.sort(() => 0.5 - Math.random()).slice(0, 4);
    return randomProducts;
  }

  const randomProducts = getRandomProducts();

  return (
    <div className="productandservice__container">
        <h3>FROM PURPLE CLOSET</h3>
      <div className='productandservice__wrapper'>
        {randomProducts.map(({ id, icon, price, name, frame }) => {
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

export default MoreProducts;