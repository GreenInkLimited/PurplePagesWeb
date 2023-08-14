import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getBlogs } from "../../apis/BlogApis";
import Logo from "../../assets/pplogo.png";

const MAX_DETAIL_LENGTH = 100;

const truncateText = (text) => {
  // Remove HTML tags from the text
  const plainText = text.replace(/<[^>]+>/g, "");

  if (plainText.length <= MAX_DETAIL_LENGTH) {
    return text;
  }

  return plainText.slice(0, MAX_DETAIL_LENGTH) + "...";
};

const HomeBlogContent = ({
  searchQuery,
  searchResults,
  filteredResults,
  loading,
  blogs,
}) => {
  const [filterByLikes, setFilterByLikes] = useState(false);

  if (loading) {
    return (
      <div className="spinner_container">
        <img src={Logo} alt="logo" />
      </div>
    );
  }

  return (
    <div className="blog container">
      <div className="blog__container">
        <div className="blog__wrapper">
          {blogs.map(({ id, image, detail, title, owner, date }) => {
            const createdDate = new Date(date);
            const options = { month: "long", day: "numeric", year: "numeric" };
            const formattedDate = createdDate.toLocaleDateString(
              "en-US",
              options
            );
            return (
              <div className="blog__value" key={id}>
                <Link to={`${id}`}>
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

export default HomeBlogContent;
