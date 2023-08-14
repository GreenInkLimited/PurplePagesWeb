import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/pplogo.png";
import { applinks } from "../data";
import { GoThreeBars } from "react-icons/go";
import { MdOutlineClose } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import Icon from "../assets/icon.png";
import Notify from "../assets/notify.png";
import "./appnavbar.css";
import { MdKeyboardArrowDown } from "react-icons/md";
import Notification from "./Notification";
import Profile from "./Profile";
import { getUser } from "../apis";
import { Filter } from "../apis/FilterApis";

const AppNavbar = () => {
  const [isNavShowing, setIsNavShowing] = useState(false);
  const [onClick, setOnClick] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const modalRef = useRef(null); // Reference to the modal container
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
                  <input className="appinput" placeholder="search" />
                </div>
              </div>
            </li>
          </ul>

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
    </>
  );
};

export default AppNavbar;
