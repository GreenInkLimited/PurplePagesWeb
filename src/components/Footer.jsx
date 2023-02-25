import React from 'react';
import Logo from '../assets/pplogo.png'
import Facebook from '../assets/facebook.png';
import Twitter from '../assets/twitter.png';
import Instagram from '../assets/instagram.png';
import Contact from '../assets/contact.png';
import Email from '../assets/email.png';
import Appstore from '../assets/Appstore.png'
import Playstore from '../assets/Playstore.png'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
        <div className="container footer__container">
            <article>
                <Link to="/" className="logo">
                    <img src={Logo} alt="Footer Logo" />
                </Link>
                <p>
                    Your one -stop digital marketing solution
                </p>
                <div className="footer__socials">
                    
                    <a href='#' target="_blank" rel='noreferrer noopener'>
                        <img src={Facebook} alt="facebook" />
                    </a>
                    <a href='#' target="_blank" rel='noreferrer noopener'>
                        <img src={Twitter} alt="twitter" />
                    </a> 
                    <a href='#' target="_blank" rel='noreferrer noopener'>
                        <img src={Instagram} alt="instagram" />
                    </a>
                </div>
            </article>
            <article>
                <h4>Useful Links</h4>
                <Link to="/">Home</Link>
                <Link to="/about">About Us</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/">Terms & Conditions</Link>
            </article>
            <article>
                <h4>Help & Support</h4>
                <Link to="/">How it works</Link>
                <Link to="/about">FAQs</Link>
                <Link to="/contact">Privacy Policy</Link>
                
            </article>
            <article>
                <h4>Contact Us</h4>
                <Link to="/">hello@usepurplepages.com</Link>
                <Link to="/about">+234 800 0000 000</Link>
            </article>
            <article>
                <h4>Install App</h4>
                <a href='#' target="_blank" rel='noreferre noopener'>
                        <img src={Appstore} alt="facebook" />
                    </a>
                <a href='#' target="_blank" rel='noreferre noopener'>
                        <img src={Playstore} alt="facebook" />
                    </a>
            </article>
        </div>
        <div className="footer__copyright">
            Copyrights © 2021 Green INK Limited. All rights reserved
        </div>
    </footer>
  )
}

export default Footer