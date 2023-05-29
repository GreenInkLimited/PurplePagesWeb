import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ExternalLinkLine from '../../assets/ExternalLinkLine.png';
import Delete from '../../assets/Delete.png';
import { getWishlist } from '../../apis/WishlistApis';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/pplogo.png';
import { DeleteWishlist } from '../../apis/WishlistApis';

const ProductWishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await getWishlist({ pageParam: 0 });
        setWishlist(response); // Set the user state with the response data directly
        setLoading(false);
      } catch (error) {
        console.log('Error fetching Wishlists:', error);
      }
    };
    fetchWishlist();
  }, []);

  const handleDelete = async (wishlistId) => {
    try {
      await DeleteWishlist({ wishlist_id: wishlistId });
      setWishlist((prevWishlist) =>
        prevWishlist.filter((item) => item.id !== wishlistId)
      );
    } catch (error) {
      console.log('Error deleting item:', error);
    }
  };

  if (loading) {
    return (
      <div className='spinner_container'>
        <img src={Logo} />
      </div>
    );
  }

  return (
    <div className='productwishlist__container'>
      <div className='productwishlist__wrapper'>
        {wishlist.length === 0 ? (
          <div className='empity-productwishlist__container'>
            <h4>You have not product in your wishlist</h4>
          <p>explore the products and services by diverse businesses.</p>
          <Link to="/apphome/" className='empty__wishlist'>Go Home</Link>
          </div>
        ) : (
          wishlist.map(({ id, image, price, caption }) => (
            <div className='productwishlist__value' key={id}>
              <div className='productwishlist__right'>
                <img src={`https://api.usepurplepages.com/${image}`} alt='icon' />
                <div>
                  <Link to={`/singleproduct/${id}`}>
                    <p className='product-wishlist__name'>{caption}</p>
                  </Link>
                  <p>
                    <b>₦{price}.00</b>
                  </p>
                </div>
              </div>
              <div className='productwishlist__left'>
                <img className='productwishlist__frame' src={ExternalLinkLine} alt='' />
                <img
                  className='productwishlist__frame'
                  src={Delete}
                  alt=''
                  onClick={() => handleDelete(id)}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductWishlist;