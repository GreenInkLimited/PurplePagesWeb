import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AiOutlineLike, AiOutlineShareAlt, AiFillLike } from 'react-icons/ai';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { RiArrowDropDownLine } from 'react-icons/ri';
import Comment from '../../assets/comment.png';
import { getBlogById, getBlogs, AddBlogComment, AddBlogLike } from '../../apis/BlogApis';
import { AddBlogWishlist } from '../../apis/WishlistApis';
import Logo from '../../assets/pplogo.png';

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
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
  const fetchBlog = async () => {
    try {
      const blogData = await getBlogById(id);
      setBlog(blogData);
      setLoading(false);

      const auth_code = localStorage.getItem('auth_code');
      const likedStatus = JSON.parse(localStorage.getItem(`likedStatus_${id}_${auth_code}`));
      setIsLiked(likedStatus || blogData.isLiked); // Update the isLiked state
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

  

  if (loading) {
    return (
      <div className='spinner_container'>
        <img src={Logo} alt="Logo" />
      </div>
    );
  }

  const formattedDate = new Date(blog.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const handleAddToWishlist = async () => {
    try {
      await AddBlogWishlist({ blog_id: id });
      setIsBookmarked(true);
    } catch (error) {
      console.error('Error adding blog to wishlist:', error);
    }
  };

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const handlePostComment = async () => {
    try {
      await AddBlogComment({ blog_id: id, comment: commentText });
      // Optionally, you can fetch the updated blog data to refresh the comments section
      const blogData = await getBlogById(id);
      setBlog(blogData);
      setCommentText(''); // Clear the comment textarea
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const handleLikeBlog = async () => {
  try {
    const auth_code = localStorage.getItem('auth_code');
    const likedStatus = JSON.parse(localStorage.getItem(`likedStatus_${id}_${auth_code}`));

    if (likedStatus) {
      // User has already liked the blog, so unlike logic
      // Call the appropriate function to unlike the blog
      // Update the liked status in the local storage and state
      localStorage.setItem(`likedStatus_${id}_${auth_code}`, JSON.stringify(false));
      setIsLiked(false);
    } else {
      // User has not liked the blog, so like logic
      await AddBlogLike({ blog_id: id, auth_code });
      // Update the liked status in the local storage and state
      localStorage.setItem(`likedStatus_${id}_${auth_code}`, JSON.stringify(true));
      setIsLiked(true);
    }

    // Optionally, you can fetch the updated blog data to refresh the like count
    const updatedBlogData = await getBlogById(id);
    setBlog(updatedBlogData);
  } catch (error) {
    console.error('Error liking blog:', error);
  }
};

  return (
    <div className='container blog__detail'>
      <div className="blog__detail-header">
        <h2>{blog.title}</h2>
        <div className='blog__bottom'>
          <img src={`https://api.usepurplepages.com/${blog.owner.image}`} alt="autor" />
          <div className="blog__bottom-detail">
            <p>{blog.owner.name}</p>
            <small>{formattedDate}</small>
          </div>
        </div>
      </div>
      <div className='blog__detail-content'>
        <img src={blog.image} alt="Blog" />
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
            <div className="blog__actions-left" onClick={handleLikeBlog}>
            {isLiked ? <AiFillLike /> : <AiOutlineLike />}
              <p>{blog.likes.length}</p> {/* Display the total number of likes */}
            </div>
            <div className="blog__actions-right">
              <div onClick={handleAddToWishlist}>
                {isBookmarked ? ( // Render filled bookmark icon if isBookmarked is true
                  <BsBookmarkFill />
                ) : (
                  <BsBookmark /> // Otherwise, render regular bookmark icon
                )}
              </div>
              <AiOutlineShareAlt />
            </div>
          </div>
          <div className='comment__flexbox'>
            <textarea
              placeholder='Leave a comment'
              className='input-box'
              value={commentText}
              onChange={handleCommentChange}
            />
            <button className='post' onClick={handlePostComment}>Post</button>
          </div>
          <div className="blog__recent-post">
            <div className="recent__postx-header">
              <h4>MOST RECENT</h4>
              <RiArrowDropDownLine />
            </div>
            {blog.comments.map((comment, index) => (
          <div className="blog__comment-body" key={index}>
            <img src={`https://api.usepurplepages.com/${comment.image}`} alt="Comment" />
            <div>
              <p>{comment.name}</p>
              <div className="reply__comment">
                <small>{comment.comment}</small>
                <p>Reply</p>
              </div>
            </div>
          </div>
        ))}
          </div>
        </div>
        <div>
          {blogs.map(({ id, image, detail, title, owner, date }) => {
            const createdDate = new Date(date);
            const options = { month: 'long', day: 'numeric', year: 'numeric' };
            const formattedDate = createdDate.toLocaleDateString('en-US', options);
            return (
              <div className="blog__body__right" key={id}>
                <img className="blog__body__right-img" src={image} alt="image" />
                <Link to={`/appblog/${id}`}>
                  <h4>{title}</h4>
                </Link>
                <p>{truncateText(detail)}</p>
                <div className='blog__body__autor'>
                  <img src={`https://api.usepurplepages.com/${owner.image}`} alt="author" />
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
  );
};

export default BlogDetail;