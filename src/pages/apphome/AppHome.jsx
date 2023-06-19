import React, { useEffect, useState } from 'react'
import AppNavbar from '../../components/AppNavBar'
import { Link, NavLink } from 'react-router-dom';
import Products from '../../components/App/Products'
import './apphome.css'
import Footer from '../../components/Footer'
import Filter from '../../components/App/Filter'
import { FilterBusiness } from '../../apis/FilterApis'
import { getUser } from '../../apis'
import Profile from '../../components/Profile'
import Notification from '../../components/Notification'
import { GoThreeBars } from 'react-icons/go';
import { MdOutlineClose } from 'react-icons/md';
import { FiSearch } from 'react-icons/fi';
import { MdKeyboardArrowDown } from 'react-icons/md';
import Logo from '../../assets/pplogo.png'
import Notify from '../../assets/notify.png';
import { applinks } from '../../data';

const Home = () => {
  const [isNavShowing, setIsNavShowing] = useState(false);
  const [onClick, setOnClick] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // Add searchQuery state to store the search input value
  const [searchResults, setSearchResults] = useState([]); // Add searchResults state to store the search results

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser({ pageParam: 0 });
        setUser(response);
      } catch (error) {
        console.log('Error fetching User:', error);
      }
    };
    fetchUser();
  }, []);
  
  const handleSearch = async () => {
  if (searchQuery.trim() === '') {
      setSearchQuery('');
      // Clear the search results and show the original list of events
      setSearchResults([]);
      return;
    }

    try {
      const results = await FilterBusiness(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching events:', error);
    }
  };
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
      <input
        className="appinput"
        placeholder="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
      }}
      />
      
    </div>
  </div>
            </li>
          </ul>

          <ul>
            <li>
              {user && (
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
      <Filter />
      <Products searchQuery={searchQuery} searchResults={searchResults}/>
      <Footer />
    </>
  )
}

export default Home