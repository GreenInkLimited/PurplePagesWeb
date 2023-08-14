import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getBlogs } from "../../apis/BlogApis";
import Logo from "../../assets/pplogo.png";

const MAX_DETAIL_LENGTH = 50;

const truncateText = (text) => {
  if (text.length <= MAX_DETAIL_LENGTH) {
    return text;
  }
  return text.slice(0, MAX_DETAIL_LENGTH) + "...";
};

const BlogContent = ({ searchQuery, searchResults, filteredResults }) => {
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
        console.log("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="spinner_container">
        <img src={Logo} alt="logo" />
      </div>
    );
  }

  let blogsToDisplay = blogs;

  if (searchQuery) {
    blogsToDisplay = searchResults;
  } else if (filteredResults.length > 0) {
    blogsToDisplay = filteredResults;
  }

  return (
    <div className="blog container">
      <div className="blog__container">
        <div className="blog__wrapper">
          {blogsToDisplay.map(({ id, image, detail, title, owner, date }) => {
            const createdDate = new Date(date);
            const options = { month: "long", day: "numeric", year: "numeric" };
            const formattedDate = createdDate.toLocaleDateString(
              "en-US",
              options
            );
            return (
              <div className="blog__value" key={id}>
                <Link to={`/appblog/${id}`}>
                  <img className="blog__value-img" src={image} alt="icon" />
                  <div className="blog__value___bodies">
                    <h2>{title}</h2>
                    <small className="small">{truncateText(detail)}</small>
                    <div className="blog__bottom">
                      <img
                        className="blog__value___bodies-img"
                        src={owner.image}
                        alt="author"
                      />
                      <div className="blog__bottom-detail">
                        <p>{owner.name}</p>
                        <small>{formattedDate}</small>
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

export default BlogContent;
