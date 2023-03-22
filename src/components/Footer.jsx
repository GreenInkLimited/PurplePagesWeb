import React from 'react';
import Logo from '../assets/pplogo.png'
import Facebook from '../assets/facebook.png';
import Twitter from '../assets/twitter.png';
import Instagram from '../assets/instagram.png';
import {AiOutlineMail} from 'react-icons/ai'
import {BsTelephone} from 'react-icons/bs'
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
                    Your one-stop digital marketing solution
                </p>
                
            </article>
            <article>
                <h4>Useful Links</h4>
                <Link to="/">Home</Link>
                <Link to="/about">About Us</Link>
                <Link to="/contact">Contact</Link>
            </article>
            <article>
                <h4>Help & Support</h4>
                <Link to="/faq">FAQs</Link>
                <Link to="/contact">Privacy Policy</Link>
                <Link to="/terms">Terms & Conditions</Link>
                
            </article>
            <article>
                <h4>Contact Us</h4>
                <Link to="/"><AiOutlineMail className='contact__icon'/>hello@usepurplepages.com</Link>
                <Link to="/about"><BsTelephone  className='contact__icon'/>+234 800 0000 000</Link>
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
        <div className="footer__copyright container">
            <div >
                    <h4>Follow Us</h4>
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
                </div>
                <div className='copyright'>
                    Copyrights © 2021 Green INK Limited. All rights reserved
                </div>
                <p></p>
        </div>
    </footer>
  )
}

export default Footer