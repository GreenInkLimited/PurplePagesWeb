import React, { useState } from "react";
import AdsContent from "../../components/Ads/AdsContent";
import AppNavbar from "../../components/AppNavBar";
import Footer from "../../components/Footer";
import { FilterBusiness } from "../../apis/FilterApis";
import "./ads.css";
import AdsFilter from "../../components/App/AdsFilter";

const Ads = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      setSearchQuery("");
      setSearchResults([]);
      return;
    }

    try {
      const results = await FilterBusiness(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching events:", error);
    }
  };
  return (
    <>
      <AppNavbar />
      <AdsFilter setFilteredProducts={setFilteredProducts} />
      <AdsContent
        searchQuery={searchQuery}
        searchResults={searchResults}
        filteredResults={filteredProducts}
      />
      <Footer />
    </>
  );
};

export default Ads;
