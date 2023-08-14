import React from "react";
import BusinessAndBrand from "../../components/Feature/BusinessAndBrand";
import EndUsers from "../../components/Feature/EndUsers";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import FeaturedClip from "../../assets/FeaturedClip.png";
import "./features.css";
import { Link } from "react-router-dom";
import Video from "../../assets/video.mp4";

const Features = () => {
  return (
    <>
      <Navbar />
      <div className="container feature__video-clip">
        <video src={Video} autoPlay controls />
      </div>
      <BusinessAndBrand />
      <EndUsers />
      <div className="container host__event__container">
        <h2>Ready for business growth?</h2>
        <Link className="link btn white" to="/auth">
          Let’s Get Started
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default Features;
