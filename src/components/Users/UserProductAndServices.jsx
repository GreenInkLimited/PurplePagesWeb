import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getMyBusinessById } from '../../apis/BusinessApi';
import Logo from '../../assets/pplogo.png';
import { AiOutlinePlus } from 'react-icons/ai';
import AddProduct from './AddProduct';
import { useQuery } from 'react-query';

const UserProductAndService = () => {
  const { id } = useParams();
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showWishlistButton, setShowWishlistButton] = useState(true);

  const { data: business, isLoading } = useQuery('business', () => getMyBusinessById({ id }));

  const openAddProductModal = () => {
    setShowAddProductModal(true);
    setShowWishlistButton(false);
  };

  const closeAddProductModal = () => {
    setShowAddProductModal(false);
    setShowWishlistButton(true);
  };

  if (isLoading) {
    return (
      <div className='spinner_container'>
        <img src={Logo} alt='Loading' />
      </div>
    );
  }

  const handleAddProduct = () => {
    setShowAddProductModal(false);
    setShowWishlistButton(true);
  };

  return (
    <div className='user__productandservice__container'>
      <div className='user__productandservice__wrapper'>
        {business?.products.length > 0 ? (
          business?.products.map((product) => (
            <Link to={`/singleproduct/${product.id}`} key={product.id}>
              <div className='user__productandservice__value'>
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
            {/* Rest of the component code */}
          </div>
        )}
      </div>
      {showAddProductModal && (
        <div className='add-product-modal'>
          <AddProduct onCancel={closeAddProductModal} businessId={id} setProducts={handleAddProduct} />
        </div>
      )}
      {showWishlistButton && business?.products.length > 0 && (
        <button className='not-empty__wishlist' onClick={openAddProductModal}>
          <AiOutlinePlus className='add__product-icon' />
        </button>
      )}
    </div>
  );
};

export default UserProductAndService;