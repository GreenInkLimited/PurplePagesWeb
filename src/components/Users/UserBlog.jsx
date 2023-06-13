import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Logo from '../../assets/pplogo.png';
import { getMyBusinessById } from '../../apis/BusinessApi';
import Pen from '../../assets/Pen.png';
import AddBlog from './AddBlog';
import { AiOutlinePlus } from 'react-icons/ai';

const MAX_DETAIL_LENGTH = 50;

const truncateText = (text) => {
  if (text.length <= MAX_DETAIL_LENGTH) {
    return text;
  }
  return text.slice(0, MAX_DETAIL_LENGTH) + '...';
};

const UserBlog = () => {
  const { id } = useParams();
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
    <div className="blog">
      
      <div className="">
        <div className="blog__wrapper">
        
          {business?.blogs.length > 0 ? (
            business?.blogs.map((blog) => (
              <div className='subscription__value-sub' key={id}>
                <img
                  className='subscription__value-img-sub'
                  src={`https://api.usepurplepages.com/${blog.image}`}
                  alt='icon'
                />
                <Link to={`/appblog/${blog.id}`}>
                  <h2>{blog.title}</h2>
                </Link>
                <p className='subcription__wrapper-sub-paragraph'>{truncateText(blog.detail)}</p>
              </div>
            ))
          ) : (
            <div className='empty-productandservice__container blog'>
              <h4>Write your first blog</h4>
              <p>
               Have any thoughts, ideas or stories you’ll love to share?
              </p>
              <button className='empty__wishlist blog' onClick={openAddProductModal}>
                <img src={Pen} alt="pen"/> write
              </button>
            </div>
          )}
        </div>
        {showAddProductModal && (
          <div className='add-product-modal'>
            <AddBlog onCancel={closeAddProductModal} businessId={id} />
          </div>
        )}
        {showWishlistButton && (
          <button className='not-empty__wishlist' onClick={openAddProductModal}>
            <AiOutlinePlus className='add__product-icon' />
          </button>
        )}
      </div>
    </div>
    
  );
};

export default UserBlog;