import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBlogs } from '../../apis/BlogApis';
import  Logo from '../../assets/pplogo.png';


const MAX_DETAIL_LENGTH = 100; 

const truncateText = (text) => {
  if (text.length <= MAX_DETAIL_LENGTH) {
    return text;
  }
  return text.slice(0, MAX_DETAIL_LENGTH) + '...';
};

const HomeBlogContent = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getBlogs({ pageParam: 0 });
        const { blogs } = response;
        setBlogs(blogs);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div className='spinner_container'>
      <img src={Logo} alt="logo"/>
    </div>;
  }

  return (
    <div className="blog container">
      
      <div className="blog__container">
        <div className="blog__wrapper">
          {blogs.map(({ id, image, detail, title, owner, date}) => {
            const createdDate = new Date(date);
            const options = { month: 'long', day: 'numeric', year: 'numeric' };
            const formattedDate = createdDate.toLocaleDateString('en-US', options);
            return (
              <div className="blog__value" key={id}>
                <Link to={`/blog/${id}`}>
                <img className="blog__value-img" src={image} alt="icon" />
                <div className="blog__value___bodies">
                
                  <h2>{title}</h2>
               
                <p className='small'>{truncateText(detail)}</p>
                <div className="blog__bottom">
                  <img className="blog__value___bodies-img" src={`https://api.usepurplepages.com/${owner.image}`} alt="author" />
                  <div className="blog__bottom-detail">
                    <p>{owner.name}</p>
                    {/* Add the appropriate date property from the blog object */}
                    <p className='smallx'>{formattedDate}</p>
                  </div>
                  </div>
                </div>
                 </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomeBlogContent;