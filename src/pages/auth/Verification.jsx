import React, {useRef} from 'react'
import Logo from '../../assets/pplogo.png'
import './auth.css'
import Footer from '../../components/Footer';

const Verification = () => {
    const form = useRef();
  return (
    <>
    <div className="container signup_wrapper">
        <div className="signup__content">
            <img src={Logo} alt="logo" />
            <div className='signup__body'>
                <h1>Verification</h1>
                <div className="signup_paragraph">
        <p>We sent a 6-digit code to <b>080***789</b> and <b>purple***@gmail.com</b></p>
        </div>
      <form ref={form}>
        <label>Verification code</label>
        <input className='input' type="text" name="user_name" placeholder='Preferably your social media one'/>
        <input className='input' type="submit" value="Proceed" />
      </form>
      
    </div>
        </div>
    </div>
    <div className='the__footer__signup'>
        <Footer />
        </div>
    </>
  )
}

export default Verification