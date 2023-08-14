import React from "react";
import { Link } from "react-router-dom";
import Image from "../../assets/phone.png";

const MainHeader = () => {
  return (
    <header className="main__header">
      <div className="container main__header-container">
        <div className="main__header-left">
          <h1>
            Your <span>One-Stop</span> Digital Marketing Solution
          </h1>
          <p>
            Purple Pages supports SMEs in effortlessly and creatively reaching a
            larger audience with our digital marketing solutions, with the
            ultimate purpose of business growth.
          </p>
          <Link to="/auth" className="btn">
            Get Started
          </Link>
        </div>
        <div className="main__header-right">
          <div className="main__header-image">
            <img src={Image} alt="Phone" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
