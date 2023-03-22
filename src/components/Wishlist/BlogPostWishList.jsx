import React from 'react'
import { blog } from '../../data';
import { Link } from 'react-router-dom';
import ExternalLinkLine from '../../assets/ExternalLinkLine.png'
import Delete from '../../assets/Delete.png'

const BlogPostWishList = () => {
  return (
    
     
        <div className="productwishlist__container">
          <div className='productwishlist__wrapper'>
            {blog.map(({ id, icon, price, name, content, title, date, autor}) => {
              
              
              return (
                <div className="blogpostswishlist__value" key={id}>
                  <div className='productwishlist__right'>
                  <img src={icon} alt="icon" />
                  </div>
                  <div>
                  
                    <h4 className='blogpost-title'>{title}</h4>
                    <div className='productwishlist__left'>
                  
                  <p>{content}</p>

                  
                  <div className='blogpost__bottom'>
                    <img src={autor} alt="autor" />
                    <div className="blog__postwishlist-details">
                    <div className="blog__postwishlist-detail">
                        <p>{name}</p>
                        <small>{date}</small>
                    </div>
                    <div className="blog__post-delete">
                    <img src={Delete} />
                    <p>Delete</p>
                    </div>
                    </div>
                    </div>
                  
                  </div>
                  
                  </div>
                  
                  </div>
              );
            })}
          </div>
        </div>
      
    
  );
}

export default BlogPostWishList