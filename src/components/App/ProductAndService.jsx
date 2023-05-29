import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getBusinessById } from '../../apis/BusinessApi';
import  Logo from '../../assets/pplogo.png'

const ProductAndService = () => {
   const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const [loading, setLoading] = useState(true); 


  const [business, setBusiness] = useState(null);

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const businessData = await getBusinessById({ id });
        setBusiness(businessData);
         setLoading(false);
      } catch (error) {
        console.error('Error fetching business:', error);
      }
    };

    fetchBusiness();
  }, [id]);

  if (loading) {
    return <div className='spinner_container'>
      <img src={Logo} />
    </div>;
  }

  return (
  <div className="productandservice__container">
    <div className="productandservice__wrapper">
      {business.products.map((product, index) => (
        <div className="productandservice__value" key={index}>
          <img 
          
          className="productandservice__value-img" src={`https://api.usepurplepages.com/${product.image}`} alt="Product Icon" />
          <Link to={`/singleproduct/${product.id}`}>
            <small>{product.caption}</small>
          </Link>
          <p>₦{product.price}.00</p>
        </div>
      ))}
    </div>
  </div>
);
};

export default ProductAndService;
