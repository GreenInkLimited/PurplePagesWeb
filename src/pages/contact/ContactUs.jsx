import React, {useRef} from 'react'
import styled from "styled-components";
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import './contact.css'

const ContactUs = () => {
    const form = useRef();
  return (
    <>
    <Navbar />
    <div className="container">
        <div className='contact__title'>
    <h2>Contact Us</h2>
    </div>
    <div className="contact__container">
        
    <div className='contact__wrapper'>
        <p>Kindly fill this form and we’ll respond</p>
      <form ref={form}>
        <label>Name</label>
        <input className='input' type="text" name="user_name" placeholder='placeholder text'/>
        <label>Email</label>
        <input className='input' type="email" name="user_email" placeholder='placeholder text'/>
        <label>Message</label>
        <textarea className='textarea' name="message" placeholder='What seems to be the problem?'/>
        <input className='input' type="submit" value="Send" />
      </form>
    </div>
    </div>
    </div>
    <Footer />
    </>
  )
}

export default ContactUs;


