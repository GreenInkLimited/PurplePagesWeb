import React, { useEffect, useState } from 'react'
import { blog } from '../../data';
import Delete from '../../assets/Delete.png'
import { getBlogWishlist } from '../../apis/WishlistApis';
import  Logo from '../../assets/pplogo.png'
import { borderRadius } from '@mui/system';

const MAX_DETAIL_LENGTH = 250; 

const truncateText = (text) => {
  if (text.length <= MAX_DETAIL_LENGTH) {
    return text;
  }
  return text.slice(0, MAX_DETAIL_LENGTH) + '...';
};

const BlogPostWishList = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true); 

   useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await getBlogWishlist({ pageParam: 0 });
        setWishlist(response); // Set the user state with the response data directly
        setLoading(false);
      } catch (error) {
        console.log('Error fetching Wishlists:', error);
      }
    };
    fetchWishlist();
  }, []);

  if (loading) {
    return <div className='spinner_container'>
      <img src={Logo} alt="logo"/>
    </div>;
  }
  return (
        <div className="productwishlist__container">
          <div className='productwishlist__wrapper'>
            {wishlist.map(({ id, image, title, pub_date, detail, business_name, business_logo}) => {
              const createdDate = new Date(pub_date);
              const options = { month: 'long', day: 'numeric', year: 'numeric' };
              const formattedDate = createdDate.toLocaleDateString('en-US', options);
              return (
                <>
                <div className="blogpostswishlist__value" key={id}>
                  <img className="blogpostswishlist__value-img" src={`https://api.usepurplepages.com/${image}`} alt="icon" />
                  <div className='blog-productwishlist__right'>
                  <h4 className='blogpost-title'>{title}</h4>
                  <p>{truncateText(detail)}</p>
                  <div className='blogpost__bottom'>
                    <img className='blogpost__bottom-img' src={`https://api.usepurplepages.com/${business_logo}`} alt="autor" />
                    <div className="blog__postwishlist-details">
                    <div className="blog__postwishlist-detail">
                        <p>{ business_name }</p>
                        <small>{formattedDate}</small>
                    </div>
                    <div className="blog__post-delete">
                    <img src={Delete} />
                    <p>Delete</p>
                    </div>
                    </div>
                  </div>
                  </div>
                  </div>
                  <div className='blogpost__bottom-mobile'>
                    <img src={`https://api.usepurplepages.com/${business_logo}`} alt="autor" />
                    <div className="blog__postwishlist-details">
                    <div className="blog__postwishlist-detail">
                        <p>{ business_name }</p>
                        <small>{formattedDate}</small>
                    </div>
                    <div className="blog__post-delete">
                    <img src={Delete} />
                    </div>
                    </div>
                    </div>
                  </>
              );
            })}
          </div>
        </div>
  );
}

export default BlogPostWishList;