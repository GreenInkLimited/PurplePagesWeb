import React from 'react'
import { blog } from '../../data';
import { ImStarEmpty, ImStarFull, ImStarHalf } from 'react-icons/im'
import { Link } from 'react-router-dom';

const BlogContent = () => {
  return (
   
      <div className="blog container">
        <div className="blog__container">
          <div className='blog__wrapper'>
            {blog.map(({ id, icon, content, title, autor, name, date }) => {
              return (
                <div className="blog__value" key={id}>
                  <img src={icon} alt="icon" />
                  <Link to={`/appblog/${id}`}>
                  <h2>{title}</h2>
                  </Link>
                  
                  <small>{content}</small>
                  <div className='blog__bottom'>
                    <img src={autor} alt="autor" />
                    <div className="blog__bottom-detail">
                        <p>{name}</p>
                        <small>{date}</small>
                    </div>
                </div>
                </div>
                
              );
            })}
          </div>
        </div>
      </div>
  );
}

export default BlogContent