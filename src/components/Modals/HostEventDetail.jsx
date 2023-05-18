import React, { useState, useRef } from 'react';
import Logo from '../../assets/pplogo.png';
import { MdArrowBack } from 'react-icons/md';

const HostEventDetail = ({ onNext }) => {
    const form = useRef();
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onNext();
  };

  return (
    <div className='modal__background'>
    <div className='personal__account__form-container'>
      <div className='persornal__account__form-top'>
        <img src={Logo} />
        <div className='persornal__account__form-back'>
          <MdArrowBack /> <p>back</p>
        </div>
      </div>
      <div className='persornal__account__form-wrapper'>
        <div className='events__scroller-123'>
            <div className='events__scroller-123content active'>
                <p>1</p>
                
            </div>
            
            <div className='events__scroller-123contentactive'>
                <p>2</p>
                
            </div>
            <div className='events__scroller-123content'>
                <p>3</p>
                
            </div>
        </div>
        
        
       

        <div className='persornal__account__main-form'>
          <form ref={form} onSubmit={handleSubmit}>
            <label>
              Full Name <small>(required)</small>
            </label>
            <input
              className='personal__input'
              type='text'
              name='user_name'
              placeholder='Placeholder text'
            />
            <label>
              Username <small>(will be displayed on your event banners)</small>
            </label>
            <input
              className='personal__input'
              type='email'
              name='user_email'
              placeholder='Placeholder text'
            />
            <label>
              Email <small>(required)</small>
            </label>
            <input
              className='personal__input'
              type='email'
              name='user_email'
              placeholder='Placeholder text'
            />
            <label>Bank Name </label>
            <input
              className='personal__input'
              type='email'
              name='user_email'
              placeholder='Placeholder text'
            />
            <label>
              Account Name <small>(Savings)</small>
            </label>
            <input
              className='personal__inputx'
              type='email'
              name='user_email'
              placeholder='Placeholder text'
            />
            <small>Payments will be sent for tickets sold</small>
            <label>Password</label>
            <input
              className='personal__input'
              type='password'
              name='user_email'
              placeholder='Placeholder text'
            />

            <button className='personal__input button'> Proceed</button>
            <div className='persornal__account__fotter-back'>
              <MdArrowBack />
              <p>go back</p>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default HostEventDetail;