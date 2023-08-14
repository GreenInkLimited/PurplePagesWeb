import React, { useState } from "react";
import Header from "../../components/Header";
import HeaderImage from "../../assets/ticket.png";
import "./events.css";
import Footer from "../../components/Footer";
import Categories from "../../components/Events/Categories";
import TrendingEvents from "../../components/Events/TrendingEvents";
import Explore from "../../components/Events/Explore";
import search from "../../assets/search.png";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import HostEventModal from "../../components/Modals/HostEventModal";
import { SearchEvents } from "../../apis/EventsApis";

const Events = () => {
  const [openModal, setOpenModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      // Clear the search results and show the original list of events
      setSearchResults([]);
      return;
    }

    try {
      const results = await SearchEvents(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching events:", error);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      {openModal && <HostEventModal closeModal={setOpenModal} />}
      <Navbar />

      <header className="myevent__header">
        <div className="myevent__header__container">
          <div className="myevent__header__container-bg">
            <img src={HeaderImage} alt="header bg" />
          </div>
          <div className="myevent__header__content">
            <h2>FIND YOUR NEXT EVENT</h2>
            <div className="event__searchContainer">
              <div className="event__search">
                <input
                  className="inputingxxx"
                  placeholder="Artist, event, location, category, speaker"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="event__search__bg" onClick={handleSearch}>
                  <img src={search} className="event__search__icon" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <Categories onCategoryClick={handleCategoryClick} />
      <TrendingEvents
        searchQuery={searchQuery}
        searchResults={searchResults}
        selectedCategory={selectedCategory}
      />
      <Explore />
      <div className="container host__event__container">
        <h2>Ready to host your event?</h2>
        <Link className="link btn white" onClick={() => setOpenModal(true)}>
          Let’s Get Started
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default Events;
