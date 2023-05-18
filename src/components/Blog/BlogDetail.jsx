import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AiOutlineLike, AiOutlineShareAlt } from 'react-icons/ai';
import { BsBookmark } from 'react-icons/bs';
import { RiArrowDropDownLine } from 'react-icons/ri';
import Comment from '../../assets/comment.png';
import { getBlogById, getBlogs } from '../../apis/BlogApis';
import Blog from '../../assets/BlogHeader1.png';
import Autor from '../../assets/Autor3.png';
import { Link } from 'react-router-dom';

const MAX_DETAIL_LENGTH = 150; 

const truncateText = (text) => {
  if (text.length <= MAX_DETAIL_LENGTH) {
    return text;
  }
  return text.slice(0, MAX_DETAIL_LENGTH) + '...';
};

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogData = await getBlogById(id);
        setBlog(blogData);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, [id]);

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

  if (!blog) {
    return <div>Loading...</div>;
  }

  const formattedDate = new Date(blog.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  

  
  return (
    <div className='container blog__detail'>
      <div className="blog__detail-header">
        <h2>{blog.title}</h2>
        <div className='blog__bottom'>
                    <img src={blog.owner.image} alt="autor" />
                    <div className="blog__bottom-detail">
                        <p>{blog.owner.name}</p>
                        <small>{formattedDate}</small>
                    </div>
                </div>
      </div>
      <div className='blog__detail-content'>
        <img src={blog.image} />
      </div>
      <div className='blog__body'>
        <div className="blog__body_left">
        <p>{blog.detail}</p>
        <div className='blog__tags'>
          {blog.tags.split(',').map((tag, index) => (
              <p key={index}>{tag.trim()}</p>
            ))}
        </div>
        <div className='blog__actions'>
          <div className="blog__actions-left">
            <AiOutlineLike />
            <p>12</p>
          </div>
          <div className="blog__actions-right">
            <BsBookmark />
            <AiOutlineShareAlt />
          </div>
        </div>
        <div className='comment__flexbox'>

          <textarea placeholder='leave a comment' className='input-box'/>
          <button className='post'>Post</button>
        </div>
        <div className="blog__recent-post">
          <div className="recent__postx-header">
          <h4>MOST RECENT</h4>
          <RiArrowDropDownLine />
          </div>
          <div className="blog__comment-body">
          <img src={Comment} />
          <div>
            <p>Purplepages01</p>
            <div className="reply__comment">
            <small>Love this piece, so informative. Keep it up purple closet👏</small>
            
              <p>Reply</p>
            </div>
          </div>
        </div>
        <div className="blog__comment-body">
          <img src={Comment} />
          <div>
            <p>Purplepages01</p>
            <div className="reply__comment">
            <small>Love this piece, so informative. Keep it up purple closet👏</small>
            
              <p>Reply</p>
            </div>
          </div>
        </div>
        </div>
        </div>
        <div>
        {blogs.map(({ id, image, detail, title, owner, date}) => {
            const createdDate = new Date(date);
            const options = { month: 'long', day: 'numeric', year: 'numeric' };
            const formattedDate = createdDate.toLocaleDateString('en-US', options);
          return (
        <div className="blog__body__right" key={id}>
          
          <img src={image}  alt="image"/>
          <Link to={`/appblog/${id}`}>
          <h4>{title}</h4>
          </Link>
          <p>{truncateText(detail)}</p>
          <div className='blog__body__autor'>
            <img  src={owner.image} alt="author" />
            <div>
            <p>{owner.name}</p>
            <small>{formattedDate}</small>
            </div>
          </div>
        </div>
        );
          })}
        </div>
      </div>
    </div>
  )
}

export default BlogDetail