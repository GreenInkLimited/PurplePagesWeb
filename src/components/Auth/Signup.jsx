import React, {useRef} from 'react'
import Logo from '../../assets/pplogo.png'
import Google from '../../assets/Google.png'
import FacebookLogin from '../../assets/FacebookLogin.png'
import Line from '../../assets/Line.png'
import {IoIosCheckboxOutline} from 'react-icons/io'
import { Link } from 'react-router-dom';

const Signup = () => {
    const form = useRef();
  return (
    <div className="container signup_wrapper">
        <div className="signup__content">
            <img src={Logo} alt="logo" />
            <div className='signup__body'>
                <h1>Create an account</h1>
                <div className="signup_paragraph">
        <p>Already have an account?</p><Link to="/signin/"><span>Sign in</span></Link>
        </div>
        <div className="signup__with__alt">
            <img src={Google} alt="google" />
            <img src={FacebookLogin} alt="facebook" />
        </div>
        <div className='sigmup__with__alt__two'>
            <img src={Line} />
            <p>OR</p>
            <img src={Line} />
        </div>
      <form ref={form}>
        <label>Name</label>
        <input className='input' type="text" name="user_name" placeholder='Preferably your social media one'/>
        <label>Email</label>
        <input className='input' type="email" name="user_email" placeholder='Preferably your social media one'/>
        <label>Phone Number</label>
        <input className='input' type="email" name="user_email" placeholder='Preferably your social media one'/>
         <label>Password</label>
        <input className='input' type="email" name="user_email" placeholder='Preferably your social media one'/>
        <div className='agree__to__terms'>
        <IoIosCheckboxOutline />
        <p>I agree to purple pages </p>
        <Link to="/terms/">
        <span>Terms & Conditions</span>
        </Link>
      </div>
        <input className='input' type="submit" value="Proceed" />
      </form>
      
    </div>
        </div>
    </div>
  )
}

export default Signup