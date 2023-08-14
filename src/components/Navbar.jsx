import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/pplogo.png";
import { links } from "../data";
import { GoThreeBars } from "react-icons/go";
import { MdOutlineClose, MdOutlineCancel } from "react-icons/md";
import "./navbar.css";

const Navbar = () => {
  const [isNavShowing, setIsNavShowing] = useState(false);

  const handleNavToggle = () => {
    setIsNavShowing(!isNavShowing);
  };

  const closeNav = () => {
    setIsNavShowing(false);
  };

  return (
    <nav>
      <div className="container nav__container">
        <button className="nav__toggle-btn" onClick={handleNavToggle}>
          {isNavShowing ? <MdOutlineClose /> : <GoThreeBars />}
        </button>
        <Link to="/" className="logo" onClick={closeNav}>
          <img className="logo_image_nav" src={Logo} alt="Nav Logo" />
        </Link>
        <ul
          className={`nav__links ${isNavShowing ? "show__nav" : "hide__nav"}`}
        >
          <div className="nav__links-formobile">
            <Link to="/" className="logo" onClick={closeNav}>
              <img src={Logo} alt="Nav Logo" />
            </Link>
            <button className="nav__toggle-btn" onClick={closeNav}>
              <MdOutlineCancel />
            </button>
          </div>
          {links.map(({ name, path }, index) => {
            return (
              <li key={index}>
                <NavLink to={path} activeClassName="active" onClick={closeNav}>
                  {name}
                </NavLink>
              </li>
            );
          })}
        </ul>
        <ul>
          <li>
            <Link to="/auth">
              <button className="nav__btn">Login</button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
