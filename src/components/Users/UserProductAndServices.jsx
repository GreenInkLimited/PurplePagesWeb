import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getMyBusinessById } from '../../apis/BusinessApi';
import Logo from '../../assets/pplogo.png';
import frame from '../../assets/Frame3.png';
import { AiOutlinePlus } from 'react-icons/ai';
import AddProduct from './AddProduct';

const UserProductAndService = () => {
  const { id } = useParams(); // Make sure to include curly braces around `useParams`
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showWishlistButton, setShowWishlistButton] = useState(true);

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const businessData = await getMyBusinessById({ id });
        setBusiness(businessData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bio:', error);
      }
    };

    fetchBusiness();
  }, [id]);

  const openAddProductModal = () => {
    setShowAddProductModal(true);
  };

  const closeAddProductModal = () => {
    setShowAddProductModal(false);
  };

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    setShowWishlistButton(scrollTop > 500);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (loading) {
    return (
      <div className='spinner_container'>
        <img src={Logo} alt='Loading' />
      </div>
    );
  }

  return (
    <div className='user__productandservice__container'>
      <div className='user__productandservice__wrapper'>
        {business?.products.length > 0 ? (
          business?.products.map((product) => (
            <Link to={`/singleproduct/${product.id}`}>
            <div className='user__productandservice__value' key={product.id}>
              <img
                className='user__productandservice__value-img'
                src={`https://api.usepurplepages.com/${product.image}`}
                alt='icon'
              />
            </div>
            </Link>
          ))
        ) : (
          <div className='empty-productandservice__container'>
            <h4>Add your first product/service</h4>
            <p>
              Products and services are what you offer to your customers,
              ranging from physical goods to digital services. In other words,
              these are the items that you are selling to your customers.
            </p>
            <button className='empty__wishlist' onClick={openAddProductModal}>
              <AiOutlinePlus className='add__product-icon' /> Add a product
            </button>
          </div>
        )}
      </div>
      {showAddProductModal && (
        <div className='add-product-modal'>
          <AddProduct onCancel={closeAddProductModal} businessId={id} />
        </div>
      )}
      {showWishlistButton && (
        <button className='not-empty__wishlist' onClick={openAddProductModal}>
          <AiOutlinePlus className='add__product-icon' />
        </button>
      )}
    </div>
  );
};

export default UserProductAndService;