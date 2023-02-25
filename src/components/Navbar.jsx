import React, {useState} from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../assets/pplogo.png';
import { links } from '../data';
import {GoThreeBars} from 'react-icons/go'
import {MdOutlineClose} from 'react-icons/md'
import './navbar.css';


const Navbar = () => {
    const [isNavShowing, setIsNavShowing] = useState(false);
  return (
    <nav>
      <div className="container nav__container">
        <Link to="/" className='logo' onClick={() => setIsNavShowing(false)}>
            <img src={Logo} alt="Nav Logo" />
        </Link>
       <ul className={`nav__links ${isNavShowing ? 'show__nav' : 'hide__nav'}`} onClick={() => setIsNavShowing(prev => !prev)}>
        {
            links.map(({name, path}, index) => {
                return (
                    <li key={index}>
                        <NavLink to={path}>
                            {name}
                        </NavLink>
                    </li>
                )
            })
        }
       </ul>

       <ul>
        <li>
            <Link to="/signup">
                <button className='nav__btn'>
                    Login
                </button>
            </Link>
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

export default Navbar
