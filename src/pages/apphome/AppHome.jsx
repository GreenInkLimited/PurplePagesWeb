import React, { useEffect, useRef, useState } from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";
import Products from "../../components/App/Products";
import "./apphome.css";
import Footer from "../../components/Footer";
import Filter from "../../components/App/Filter";
import { FilterBusiness } from "../../apis/FilterApis";
import { getUser } from "../../apis";
import Profile from "../../components/Profile";
import Notification from "../../components/Notification";
import { GoThreeBars } from "react-icons/go";
import { MdOutlineClose } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { MdKeyboardArrowDown } from "react-icons/md";
import Logo from "../../assets/pplogo.png";
import Notify from "../../assets/notify.png";
import { applinks } from "../../data";

const Home = () => {
  const navigate = useNavigate();
  const [isNavShowing, setIsNavShowing] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const modalRef = useRef(null); // Reference to the modal container
  const [filteredProducts, setFilteredProducts] = useState([]);
  const storedUser = localStorage.getItem("user");
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser({ pageParam: 0 });
        setUser(response);
        localStorage.setItem("user", JSON.stringify(response));
      } catch (error) {
        console.log("Error fetching User:", error);
      }
    };
    if (!storedUser) {
      fetchUser();
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpenNotification(false);
        setOpenProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  const openNotificationModal = () => {
    setOpenNotification(true);
    setOpenProfile(false);
  };

  const openProfileModal = () => {
    setOpenNotification(false);
    setOpenProfile(true);
  };

  const closeModals = () => {
    setOpenNotification(false);
    setOpenProfile(false);
  };

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, [user, navigate]);
  return (
    <>
      <nav className="my__nav">
        <div className="container nav__containers">
          <button
            className="nav__toggle-btn"
            onClick={() => setIsNavShowing((prev) => !prev)}
          >
            {isNavShowing ? <MdOutlineClose /> : <GoThreeBars />}
          </button>
          <Link
            to="/apphome"
            className="logo"
            onClick={() => setIsNavShowing(false)}
          >
            <img className="logo_image_nav" src={Logo} alt="Nav Logo" />
          </Link>
          <ul
            className={`my__nav__links ${
              isNavShowing ? "show__nav" : "hide__nav"
            }`}
            onClick={() => setIsNavShowing((prev) => !prev)}
          >
            {applinks.map(({ name, path }, index) => {
              return (
                <li key={index}>
                  <NavLink to={path} activeStyle={{ color: "red" }}>
                    {name}
                  </NavLink>
                </li>
              );
            })}

            <li>
              <div className="searchContainer">
                <div className="appsearch">
                  <FiSearch />
                  <input
                    className="appinput"
                    placeholder="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                      }
                    }}
                  />
                </div>
              </div>
            </li>
          </ul>

          <ul>
            <ul>
              <li>
                {user && (
                  <div className="nav__right">
                    <img
                      onClick={openNotificationModal}
                      src={Notify}
                      alt="Nav Logo"
                    />
                    <div className="nav__profile" onClick={openProfileModal}>
                      <img src={user.image} alt="Nav Logo" />
                      <p>{user.username}</p>
                      <MdKeyboardArrowDown onClick={openProfileModal} />
                    </div>
                  </div>
                )}
              </li>
            </ul>
          </ul>
        </div>
      </nav>
      {openNotification && (
        <div ref={modalRef}>
          <Notification onClose={closeModals} />
        </div>
      )}
      {openProfile && (
        <div ref={modalRef}>
          <Profile onClose={closeModals} />
        </div>
      )}
      <Filter setFilteredProducts={setFilteredProducts} />
      <Products
        searchQuery={searchQuery}
        searchResults={searchResults}
        filteredResults={filteredProducts}
      />
      <Footer />
    </>
  );
};

export default Home;
