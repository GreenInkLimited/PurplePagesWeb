import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../assets/pplogo.png';
import { applinks } from '../data';
import { GoThreeBars } from 'react-icons/go';
import { MdOutlineClose } from 'react-icons/md';
import { FiSearch } from 'react-icons/fi';
import Icon from '../assets/icon.png';
import Notify from '../assets/notify.png';
import './appnavbar.css';
import { MdKeyboardArrowDown } from 'react-icons/md';
import Notification from './Notification';
import Profile from './Profile';
import { getUser } from '../apis';

const AppNavbar = () => {
  const [isNavShowing, setIsNavShowing] = useState(false);
  const [onClick, setOnClick] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [user, setUser] = useState(null); // Initialize with null instead of an empty array

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser({ pageParam: 0 });
        setUser(response); // Set the user state with the response data directly
      } catch (error) {
        console.log('Error fetching User:', error);
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <nav className="my__nav">
        <div className="container nav__containers">
          <Link to="/" className="logo" onClick={() => setIsNavShowing(false)}>
            <img src={Logo} alt="Nav Logo" />
          </Link>
          <ul
            className={`my__nav__links ${isNavShowing ? 'show__nav' : 'hide__nav'}`}
            onClick={() => setIsNavShowing((prev) => !prev)}
          >
            {applinks.map(({ name, path }, index) => {
              return (
                <li key={index}>
                 <NavLink to={path} activeStyle={{ color: 'red' }}>{name}</NavLink>
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
              {user && ( // Check if user is not null before accessing its properties
                <div className="nav__right">
                  <img
                    onClick={() => setOpenNotification((prev) => !prev)}
                    src={Notify}
                    alt="Nav Logo"
                  />

                  <div className="nav__profile">
                    <img src={user.image} alt="Nav Logo" />
                    <p>{user.username}</p>
                    <MdKeyboardArrowDown onClick={() => setOpenProfile((prev) => !prev)} />
                  </div>
                </div>
              )}
            </li>
          </ul>
          <button className="nav__toggle-btn" onClick={() => setIsNavShowing((prev) => !prev)}>
            {isNavShowing ? <MdOutlineClose /> : <GoThreeBars />}
          </button>
        </div>
      </nav>
      {openNotification && <Notification />}
      {openProfile && <Profile />}
    </>
  );
};

export default AppNavbar;