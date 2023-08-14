import React, { useState, useEffect, useRef } from "react";
import { TiArrowUnsorted } from "react-icons/ti";
import { Formik, Form } from "formik";
import { RiStarFill } from "react-icons/ri";
import {
  fetchBusinessesByCategory,
  fetchBusinessesByLocation,
  fetchBusinessesByRating,
} from "../../apis/FilterApis";

const Filter = ({ setFilteredProducts }) => {
  const [activeFilter, setActiveFilter] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedRating, setSelectedRating] = useState("");

  const options = [5, 4, 3, 2, 1, 0];
  const locations = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "Abuja",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
  ];
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

  const handleFilterSelection = (filterType, selectedItem) => {
    // Update the selected filter based on the filter type
    switch (filterType) {
      case "category":
        setSelectedCategory(selectedItem);
        break;
      case "location":
        setSelectedLocation(selectedItem);
        break;
      case "rating":
        setSelectedRating(selectedItem);
        break;
      default:
        break;
    }

    // Close the active filter
    setActiveFilter(null);
  };

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
      const businesses = await fetchBusinessesByCategory(selectedCategory);
      console.log("Businesses:", businesses);
      console.log("Businesses length:", businesses.length);
      handleFilterSelection("category", selectedCategory);
      if (businesses.length > 0) {
        console.log("Selected businesses:", businesses);
        setFilteredProducts(businesses); // Update the filtered products state with all fetched businesses
      } else {
        console.log("No businesses found for the selected category.");
        setFilteredProducts([]); // Update the filtered products state with an empty array
      }

      // Update state or perform any necessary operations with the fetched businesses
    } catch (error) {
      console.error("Error fetching businesses by category:", error);
    }
  };

  const handleLocationChange = async (e, selectedLocation) => {
    setSelectedLocation(selectedLocation);

    try {
      const businesses = await fetchBusinessesByLocation(selectedLocation);
      console.log("Businesses:", businesses);
      console.log("Businesses length:", businesses.length);
      handleFilterSelection("location", selectedLocation);
      if (businesses.length > 0) {
        console.log("Selected businesses:", businesses);
        setFilteredProducts(businesses); //
      } else {
        console.log("No businesses found for the selected Location.");
        setFilteredProducts([]);
      }
      // Update state or perform any necessary operations with the fetched businesses
    } catch (error) {
      console.error("Error fetching businesses by Location:", error);
    }
  };

  const handleRatingChange = async (e, selectedRating) => {
    setSelectedRating(selectedRating);

    try {
      const businesses = await fetchBusinessesByRating(selectedRating);
      console.log("Businesses:", businesses);
      console.log("Businesses length:", businesses.length);
      handleFilterSelection("rating", selectedRating);

      if (businesses.length > 0) {
        console.log("Selected businesses:", businesses);
        setFilteredProducts(businesses);
      } else {
        console.log("No businesses found for the selected Rating.");
        setFilteredProducts([]);
      }
    } catch (error) {
      console.error("Error fetching businesses by Rating:", error);
      setFilteredProducts([]);
    }
  };

  const renderStars = (count) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < count) {
        stars.push(<RiStarFill key={i} className="rating-icon active" />);
      } else {
        stars.push(<RiStarFill key={i} className="rating-icon" />);
      }
    }
    return stars;
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
                  activeFilter === "location" ? " active" : ""
                }`}
                onClick={() =>
                  setActiveFilter(
                    activeFilter === "location" ? null : "location"
                  )
                }
              >
                {activeFilter === "location"
                  ? selectedLocation || "Locations"
                  : "Locations"}
                <div className="dropdown__filter-icons">
                  {activeFilter === "location" ? (
                    <TiArrowUnsorted className="dropdown__filter-icon" />
                  ) : (
                    <TiArrowUnsorted className="dropdown-icon" />
                  )}
                </div>
              </div>
              {activeFilter === "location" && (
                <div className="dropdown__filter-content">
                  {locations.map((option) => (
                    <div
                      key={option}
                      onClick={(e) => handleLocationChange(e, option)} // Pass the event object and selected location
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
                  activeFilter === "rating" ? " active" : ""
                }`}
                onClick={() =>
                  setActiveFilter(activeFilter === "rating" ? null : "rating")
                }
              >
                {activeFilter === "rating"
                  ? selectedRating || "Ratings"
                  : "Ratings"}
                <div className="dropdown__filter-icons">
                  {activeFilter === "rating" ? (
                    <TiArrowUnsorted className="dropdown__filter-icon" />
                  ) : (
                    <TiArrowUnsorted className="dropdown-icon" />
                  )}
                </div>
              </div>
              {activeFilter === "rating" && (
                <div className="dropdown__filter-content">
                  {options.map((option) => (
                    <div
                      key={option}
                      onClick={(e) => handleRatingChange(e, option)} // Pass the event object and selected rating
                      className="dropdown__filter-item"
                    >
                      {renderStars(option)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Form>
      </Formik>

      {/* Display filtered products */}
      {/* <div>
        {filteredProducts.map((product) => (
          <div key={product.id}>
            <p>{product.category}</p>
            <p>{product.name}</p>
            <p>{product.location}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Filter;
