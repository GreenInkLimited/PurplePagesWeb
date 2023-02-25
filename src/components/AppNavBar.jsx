import React, {useState} from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../assets/pplogo.png';
import { applinks } from '../data';
import {GoThreeBars} from 'react-icons/go'
import {MdOutlineClose} from 'react-icons/md'
import { FiSearch } from 'react-icons/fi'
import Icon from '../assets/icon.png'
import Notify from '../assets/notify.png'
import './appnavbar.css';
import {MdKeyboardArrowDown} from 'react-icons/md'


const AppNavbar = () => {
    const [isNavShowing, setIsNavShowing] = useState(false);
  return (
    <nav className='my__nav'>
      <div className="container nav__containers">
        <Link to="/" className='logo' onClick={() => setIsNavShowing(false)}>
            <img src={Logo} alt="Nav Logo" />
        </Link>
       <ul className={`my__nav__links ${isNavShowing ? 'show__nav' : 'hide__nav'}`} onClick={() => setIsNavShowing(prev => !prev)}>
        {
            applinks.map(({name, path}, index) => {
                return (
                    <li key={index}>
                        <NavLink to={path}>
                            {name}
                        </NavLink>
                    </li>
                )
            })
        }

        <li>
            <div className="searchContainer">
                
            <div className="appsearch">
                <FiSearch />
                <input className='appinput' placeholder='search'/>
            </div>
        </div>
        </li>
        
       </ul>

       
       <ul>
        <li>
            <div className='nav__right'>
                <img src={Notify} alt="Nav Logo" />
                <div className='nav__profile'>
                    <img src={Icon} alt="Nav Logo" />
                    <p>Purple Closet</p>
                    <MdKeyboardArrowDown />
                </div>
            </div>
        </li>
       </ul>
       <button className='nav__toggle-btn' onClick={() => setIsNavShowing(prev => !prev)}>
        {
            isNavShowing ? <MdOutlineClose />  : <GoThreeBars />
        }
       </button>
      </div>
    </nav>
  )
}

export default AppNavbar
