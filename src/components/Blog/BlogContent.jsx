import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBlogs } from '../../apis/BlogApis';
import Write from '../../assets/write.png';


const MAX_DETAIL_LENGTH = 150; 

const truncateText = (text) => {
  if (text.length <= MAX_DETAIL_LENGTH) {
    return text;
  }
  return text.slice(0, MAX_DETAIL_LENGTH) + '...';
};

const BlogContent = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getBlogs({ pageParam: 0 });
        const { blogs } = response;
        setBlogs(blogs);
      } catch (error) {
        console.log('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="blog container">
      <div className="blog_filtering">
        <Link className="blog_filtering" to="/writeblog/">
          <img src={Write} alt="write" />
          <p>Write</p>
        </Link>
      </div>
      <div className="blog__container">
        <div className="blog__wrapper">
          {blogs.map(({ id, image, detail, title, owner, date}) => {
            const createdDate = new Date(date);
            const options = { month: 'long', day: 'numeric', year: 'numeric' };
            const formattedDate = createdDate.toLocaleDateString('en-US', options);
            return (
              <div className="blog__value" key={id}>
                <img src={image} alt="icon" />
                <Link to={`/appblog/${id}`}>
                  <h2>{title}</h2>
                </Link>
                <small>{truncateText(detail)}</small>
                <div className="blog__bottom">
                  <img src={owner.image} alt="author" />
                  <div className="blog__bottom-detail">
                    <p>{owner.name}</p>
                    {/* Add the appropriate date property from the blog object */}
                    <small>{formattedDate}</small>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BlogContent;