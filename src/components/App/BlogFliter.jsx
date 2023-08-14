import React, { useState, useEffect, useRef } from "react";
import { TiArrowUnsorted } from "react-icons/ti";
import { Formik, Form } from "formik";
import { fetchBlogByCategory, fetchBlogsByLikes } from "../../apis/FilterApis";

const BlogFilter = ({ setBlogs, blogs }) => {
  console.log(blogs, "they load");
  const [activeFilter, setActiveFilter] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [start, setStart] = useState(0);
  const [stop, setStop] = useState(10);

  const categories = [
    "Education",
    "Food & Drinks",
    "Fashion",
    "Technology",
    "Logistics",
    "Entertainment",
    "Agriculture",
    "Finance",
    "Construction",
    "Pharmaceuticals",
    "Branding and Marketing",
    "Others",
  ];

  const filterRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the filter container
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setActiveFilter(null); // Close the active filter
      }
    };

    // Attach the event listener to the window object
    window.addEventListener("click", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleCategoryChange = async (e, selectedCategory) => {
    setSelectedCategory(selectedCategory);

    try {
      const filteredBlogs = await fetchBlogByCategory(selectedCategory);
      console.log("Filtered Blogs:", filteredBlogs);

      if (filteredBlogs.length > 0) {
        setBlogs(filteredBlogs); // Update the filtered blogs state
      } else {
        console.log("No blogs found for the selected category.");
        setBlogs([]); // Clear the blogs state if no blogs are found
      }

      setActiveFilter(null);
    } catch (error) {
      console.error("Error fetching blogs by category:", error);
    }
  };

  const handleLikesFilter = () => {
    // only filters current blogs on the page by the amount of likes they have
    let filteredBlogsByLikes = [...blogs];
    filteredBlogsByLikes = filteredBlogsByLikes.sort(
      (a, b) => b.likes - a.likes
    );
    console.log(filteredBlogsByLikes[0].id, "after filtering");
    setBlogs(filteredBlogsByLikes);
    setActiveFilter(null);
  };

  const handleDateFilter = () => {
    let filteredBlogsByDate = [...blogs];
    filteredBlogsByDate = filteredBlogsByDate.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    });
    setActiveFilter(null);
    console.log(filteredBlogsByDate[0].id, "after filtering");
    setBlogs(filteredBlogsByDate);
  };

  const handleDateFilterOld = () => {
    let filteredBlogsByDate = [...blogs];
    filteredBlogsByDate = filteredBlogsByDate.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA - dateB;
    });
    setActiveFilter(null);
    console.log(filteredBlogsByDate[0].id, "after filtering");
    setBlogs(filteredBlogsByDate);
  };

  const handleLikesFilterLowToHigh = () => {
    // only filters current blogs on the page by the amount of likes they have
    let filteredBlogsByLikes = [...blogs];
    filteredBlogsByLikes = filteredBlogsByLikes.sort(
      (a, b) => a.likes - b.likes
    );
    console.log(filteredBlogsByLikes[0].id, "after filtering");
    setBlogs(filteredBlogsByLikes);
    setActiveFilter(null);
  };

  return (
    <div className="container filter__container" ref={filterRef}>
      <Formik>
        <Form>
          <div className="filter__container-row">
            <p>Filter by:</p>
            <div className="dropdown__filterxx">
              <div
                className={`dropdown__filter-btn${
                  activeFilter === "category" ? " active" : ""
                }`}
                onClick={() =>
                  setActiveFilter(
                    activeFilter === "category" ? null : "category"
                  )
                }
              >
                {activeFilter === "category"
                  ? selectedCategory || "Categories"
                  : "Categories"}
                <div className="dropdown__filter-icons">
                  {activeFilter === "category" ? (
                    <TiArrowUnsorted className="dropdown__filter-icon" />
                  ) : (
                    <TiArrowUnsorted className="dropdown-icon" />
                  )}
                </div>
              </div>
              {activeFilter === "category" && (
                <div className="dropdown__filter-content">
                  {categories.map((option) => (
                    <div
                      key={option}
                      onClick={(e) => handleCategoryChange(e, option)} // Pass the event object and selected category
                      className="dropdown__filter-item"
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="dropdown__filterxx">
              <div
                className={`dropdown__filter-btn${
                  activeFilter === "likes" ? " active" : ""
                }`}
                onClick={() =>
                  setActiveFilter(activeFilter === "likes" ? null : "likes")
                }
              >
                Likes
                <div className="dropdown__filter-icons">
                  {activeFilter === "likes" ? (
                    <TiArrowUnsorted className="dropdown__filter-icon" />
                  ) : (
                    <TiArrowUnsorted className="dropdown-icon" />
                  )}
                </div>
              </div>
              {activeFilter === "likes" && (
                <div className="dropdown__filter-content">
                  <div>
                    <div
                      className="dropdown__filter-item"
                      onClick={handleLikesFilter}
                    >
                      High to Low
                    </div>
                    <div
                      className="dropdown__filter-item"
                      onClick={handleLikesFilterLowToHigh}
                    >
                      Low to High
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="dropdown__filterxx">
              <div
                className={`dropdown__filter-btn${
                  activeFilter === "date" ? " active" : ""
                }`}
                onClick={() =>
                  setActiveFilter(activeFilter === "date" ? null : "date")
                }
              >
                Date Published
                <div className="dropdown__filter-icons">
                  {activeFilter === "date" ? (
                    <TiArrowUnsorted className="dropdown__filter-icon" />
                  ) : (
                    <TiArrowUnsorted className="dropdown-icon" />
                  )}
                </div>
              </div>
              {activeFilter === "date" && (
                <div className="dropdown__filter-content">
                  <div>
                    <div
                      className="dropdown__filter-item"
                      onClick={handleDateFilter}
                    >
                      Latest
                    </div>
                    <div
                      className="dropdown__filter-item"
                      onClick={handleDateFilterOld}
                    >
                      Oldest
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default BlogFilter;
