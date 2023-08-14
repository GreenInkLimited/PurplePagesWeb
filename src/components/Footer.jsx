import React from "react";
import Logo from "../assets/pplogo.png";
import Twitter from "../assets/twitter.png";
import Instagram from "../assets/instagram.png";
import { AiOutlineMail } from "react-icons/ai";
import { BsTelephone } from "react-icons/bs";
import Appstore from "../assets/Appstore.png";
import Playstore from "../assets/Playstore.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="container footer__container">
        <article>
          <Link to="/" className="logo_footer">
            <img src={Logo} alt="Footer Logo" />
          </Link>
          <p>Your one-stop digital marketing solution</p>
        </article>
        <article>
          <h4>Useful Links</h4>
          <Link to="/">Home</Link>
          <a href="https://usepurplepages.com/about" rel="noreferre noopener">
            About Us
          </a>
          <a href="https://usepurplepages.com/contact" rel="noreferre noopener">
            Contact
          </a>
        </article>
        <article>
          <h4>Help & Support</h4>
          <a href="https://usepurplepages.com/faq" rel="noreferre noopener">
            FAQs
          </a>
          <a
            href="https://usepurplepages.com/privacy-policy"
            rel="noreferre noopener"
          >
            Privacy Policy
          </a>
          <a href="https://usepurplepages.com/terms" rel="noreferre noopener">
            Terms & Conditions
          </a>
        </article>
        <article>
          <h4>Contact Us</h4>
          <a href="mailto:hello@usepurplepages.com" rel="noreferre noopener">
            <AiOutlineMail className="contact__icon" />
            hello@usepurplepages.com
          </a>
          <a href="tel:+234 703 092 6668" rel="noreferre noopener">
            <BsTelephone className="contact__icon" />
            +234 703 092 6668
          </a>
        </article>
        <article>
          <h4>Install App</h4>
          <div className="footer__install__app">
            <a href="#" target="_blank" rel="noreferre noopener">
              <img src={Appstore} alt="facebook" />
            </a>
            <a href="#" target="_blank" rel="noreferre noopener">
              <img src={Playstore} alt="facebook" />
            </a>
          </div>
        </article>
      </div>
      <div className="footer__copyright container">
        <div>
          <h4>Follow Us</h4>
          <div className="footer__socials">
            <a
              href="https://twitter.com/use_purplepages?s=11&t=qt_Byk6GrAFcmhRyH8jdHQ"
              target="_blank"
              rel="noreferrer noopener"
            >
              <img src={Twitter} alt="twitter" />
            </a>
            <a
              href="https://www.instagram.com/use_purplepages/?igshid=YmMyMTA2M2Y%3D"
              target="_blank"
              rel="noreferrer noopener"
            >
              <img src={Instagram} alt="instagram" />
            </a>
          </div>
        </div>
        <div className="copyright">
          Copyrights © 2021 Green INK Limited. All rights reserved
        </div>
        <p></p>
      </div>
    </footer>
  );
};

export default Footer;
