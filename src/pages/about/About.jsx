import React from "react";
import Navbar from "../../components/Navbar";
import HeaderImage from "../../assets/aboutus.png";
import Image from "../../assets/iPhone.png";
import CoreValues from "../../assets/coreValues.png";
import Bulb from "../../assets/bulb.png";
import Appstore from "../../assets/Appstore1.png";
import Playstore from "../../assets/Playstore1.png";
import Afford from "../../assets/Afford.png";
import Settings from "../../assets/Settings.png";
import "./about.css";
import Footer from "../../components/Footer";

const About = () => {
  return (
    <>
      <Navbar />
      <header className="about__header">
        <div className="about__header__container">
          <div className="about__header__container-bg">
            <img src={HeaderImage} alt="header bg" />
          </div>
          <div className="about__header__content">
            <h2>About Us</h2>
            <p>
              The platform that supports SMEs in effortlessly reaching a larger
              audience and achieving business growth.
            </p>
          </div>
        </div>
      </header>
      <div className="container aboutus">
        <h2>What We Do</h2>
        <div className="about__values__container">
          <div className="about__values__right">
            <div className="about__values__wrapper">
              <p>
                Most SMEs cannot afford the cost of comprehensive marketing to
                increase brand awareness, audience, and sales due to the rising
                cost of doing business. Building and maintaining a website to
                assist with business operations is now either too expensive or
                not sustainable. Importantly, lacking a digital identity and
                presence is detrimental to conducting business in the modern
                day.
                <br />
                <br />
                In order to provide comprehensive digital marketing solutions to
                SMEs for the aim of simply and artistically interacting with a
                larger audience, ultimately for business growth, the Purple
                Pages concept was established with a creative, problem-solving
                objective.
                <br />
                <br />
                Purple Pages is, to put it simply, a one-stop shop for SMEs'
                digital marketing needs.
              </p>
            </div>
          </div>
          <div className="about__values__left">
            <div className="about__values__image">
              <img src={Image} alt="what we do" />
            </div>
          </div>
        </div>
      </div>

      <div className="container pillars">
        <div className="pillars__values__container">
          <h2>Our Operating Pillars</h2>
          <div className="pillars__values__wrapper">
            <div>
              <div className="pillars__icon">
                <img src={Bulb} alt="pillars" />
              </div>
              <h4>Entrepreneurship</h4>
              <p>
                Our main goal is to support SME growth and profitability by
                offering business solutions that will make doing business
                easier.
              </p>
            </div>
            <div>
              <div className="pillars__icon">
                <img src={Afford} alt="pillars" />
              </div>
              <h4>Affordability</h4>
              <p>
                We are committed to offering SMEs superior marketing solutions
                at an affordable price because we understand the growing pains
                of establishing enterprises.
              </p>
            </div>
            <div>
              <div className="pillars__icon">
                <img src={Settings} alt="pillars" />
              </div>
              <h4>Technology</h4>
              <p>
                We leverage on the benefits of cutting-edge technology to
                provide solutions that are readily available and perform at
                their best.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container core__values">
        <div className="core__values__container">
          <div className="core__values__left">
            <div className="core__values__image">
              <img src={CoreValues} alt="core values" />
            </div>
          </div>

          <div className="core__values__right ">
            <h3>Our Core Values</h3>
            <div className="core__values__wrapper">
              <h4>Trust</h4>
              <p>
                We act with integrity and honour our commitments. We operate
                transparently and promote corporate social responsibility. We
                strive to earn the trust of our customers.
              </p>
            </div>

            <div className="core__values__wrapper">
              <h4>Customer & Market Excellence</h4>
              <p>
                We foster innovation, creativity, and technical/operational
                knowledge. We strive for continuous improvement and excellence
                at every touch point with our customers. We want to be the
                benchmark!
              </p>
            </div>

            <div className="core__values__wrapper">
              <h4>Inclusion</h4>
              <p>
                We recognize that we are here to serve our customers, and as a
                result, we solicit their feedback and involve them in the
                process at every stage of product development and service
                delivery. We promote inclusivity.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container ready ready__container">
        <div className="ready__left">
          <h2>Ready for business growth?</h2>
          <p>Take advantage of Purple Pages services</p>
          <div className="ready__links">
            <a href="#" target="_blank" rel="noreferrer noopener">
              <img src={Appstore} alt="Appstore" />
            </a>
            <a href="#" target="_blank" rel="noreferrer noopener">
              <img src={Playstore} alt="playstore" />
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
