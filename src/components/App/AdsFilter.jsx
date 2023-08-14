import React, { useState, useEffect, useRef } from "react";
import { TiArrowUnsorted } from "react-icons/ti";
import { Formik, Form } from "formik";
import { RiStarFill } from "react-icons/ri";
import {
  fetchAdsByCategory,
  fetchAdsByLocation,
  fetchAdsByAds,
} from "../../apis/FilterApis";

const AdsFilter = ({ setFilteredProducts }) => {
  const [activeFilter, setActiveFilter] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedAds, setSelectedAds] = useState("");

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

  const ads = [
    "Black Friday",
    "Brand Ad",
    "Discount",
    "Product Ad",
    "Promo",
    "Sales",
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
      const businesses = await fetchAdsByCategory(selectedCategory);
      console.log("Businesses:", businesses);
      console.log("Businesses length:", businesses.length);

      if (businesses.length > 0) {
        setFilteredProducts(businesses);
      } else {
        console.log("No businesses found for the selected category.");
      }
      // Update state or perform any necessary operations with the fetched businesses
      setActiveFilter(null);
    } catch (error) {
      console.error("Error fetching businesses by category:", error);
    }
  };

  const handleLocationChange = async (e, selectedLocation) => {
    setSelectedLocation(selectedLocation);

    try {
      const businesses = await fetchAdsByLocation(selectedLocation);
      console.log("Businesses:", businesses);
      console.log("Businesses length:", businesses.length);

      if (businesses.length > 0) {
        setFilteredProducts(businesses);
      } else {
        console.log("No businesses found for the selected Location.");
      }
      // Update state or perform any necessary operations with the fetched businesses
      setActiveFilter(null);
    } catch (error) {
      console.error("Error fetching businesses by Location:", error);
    }
  };

  const handleAdsChange = async (e, selectedAds) => {
    setSelectedAds(selectedAds);

    try {
      const businesses = await fetchAdsByAds(selectedAds);
      console.log("Businesses:", businesses);
      console.log("Businesses length:", businesses.length);

      if (businesses.length > 0) {
        setFilteredProducts(businesses);
      } else {
        console.log("No businesses found for the selected Location.");
      }
      // Update state or perform any necessary operations with the fetched businesses
      setActiveFilter(null);
    } catch (error) {
      console.error("Error fetching businesses by Location:", error);
    }
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
                  activeFilter === "adstype" ? " active" : ""
                }`}
                onClick={() =>
                  setActiveFilter(activeFilter === "adstype" ? null : "adstype")
                }
              >
                {activeFilter === "adstype"
                  ? selectedAds || "Ads Type"
                  : "Ads Type"}
                <div className="dropdown__filter-icons">
                  {activeFilter === "adstype" ? (
                    <TiArrowUnsorted className="dropdown__filter-icon" />
                  ) : (
                    <TiArrowUnsorted className="dropdown-icon" />
                  )}
                </div>
              </div>
              {activeFilter === "adstype" && (
                <div className="dropdown__filter-content">
                  {ads.map((option) => (
                    <div
                      key={option}
                      onClick={(e) => handleAdsChange(e, option)} // Pass the event object and selected location
                      className="dropdown__filter-item"
                    >
                      {option}
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

export default AdsFilter;
