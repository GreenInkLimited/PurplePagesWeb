import React, {useRef} from 'react'
import Logo from '../../assets/pplogo.png'
import {MdArrowBack} from 'react-icons/md'

const CorporateAccount = () => {
    const form = useRef();
  return (
    <div className='personal__account__form-container'>
        <div className="persornal__account__form-top">
                <img src={Logo} />
                <div className="persornal__account__form-back">
                <MdArrowBack /> <p>back</p>
                </div>
            </div>
        <div className="persornal__account__form-wrapper">
                <h2>Corporate Account</h2>
            <p className="persornal__account__form-paragraph">Please verify that all information submitted is accurate and matches your official identification documents.</p>

            <div className='persornal__account__main-form'>
                <form ref={form}>
        <label>Full Name <small>(required)</small></label>
        <input className='personal__input' type="text" name="user_name" placeholder='Placeholder text'/>
        <label>Username <small>(will be displayed on your event banners)</small></label>
        <input className='personal__input' type="email" name="user_email" placeholder='Placeholder text'/>
        <label>Email <small>(required)</small></label>
        <input className='personal__input' type="email" name="user_email" placeholder='Placeholder text'/>
         <label>Bank Name </label>
        <input className='personal__input' type="email" name="user_email" placeholder='Placeholder text'/>
        <label>Account Name <small>(Savings)</small></label>
        <input className='personal__inputx' type="email" name="user_email" placeholder='Placeholder text'/>
        <small>Payments will be sent for tickets sold</small>
        <label>Password</label>
        <input className='personal__input' type="password" name="user_email" placeholder='Placeholder text'/>
        
        <button className='personal__input button'>
            Create account
        </button>
        <div className="persornal__account__fotter-back">
            <MdArrowBack /><p>go back</p>
        </div>
      </form>
            </div>
        </div>
    </div>
  )
}

export default CorporateAccount