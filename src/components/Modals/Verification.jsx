import React, {useRef} from 'react'
import Logo from '../../assets/pplogo.png'
import {MdArrowBack} from 'react-icons/md'


const Verification = () => {
    const form = useRef();

    const handleSubmit = (event) => {
    event.preventDefault();

    // submit form data and do any other necessary actions...

    // redirect to new page
    window.location.href = '/stepper';
  };
  return (
    <div className='modal__background'>
      
    <div className='personal__account__form-container'>
              <div className="persornal__account__form-top">
                <img src={Logo} />
              </div>
        <div className="persornal__account__form-wrapper">
                <h2>Verification</h2>
            <p className="persornal__account__form-paragraph">Please enter the code sent to your email below</p>

            <div className='persornal__account__main-form'>
                <form ref={form} onSubmit={handleSubmit}>
        <label>Verification code <small>(required)</small></label>
        <input className='personal__input' type="text" name="user_name" placeholder='Placeholder text'/>
        
        <button className='personal__input buttonx'>
            Proceed
        </button>
      </form>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Verification