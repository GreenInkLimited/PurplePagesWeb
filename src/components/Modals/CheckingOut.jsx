import React, {useRef, useState} from 'react'
import {AiOutlineClose, AiOutlineMinus, AiOutlinePlus} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import Event from '../../assets/yourevent.png'
import './modal.css'


const CheckingOut = () => {
   const form = useRef();
  return (
    
    <div className='modal__background'>
        
          
        <div className="checkout__container">
            
            <div className="checkout__header">
                <AiOutlineClose  className='close__my-modal' />
            </div>
            <h2>Payment Information</h2>
            <div className="checkout__body">
                <div className="checkout__body-left">
                    
                    <p>Select a payment method</p>
                   
                    
                    <form ref={form}>
        
        <label className='label'>First Name</label>
        <input className='modal__input' type="email" name="user_email" placeholder='Preferably your social media one'/>
         <label className='label'>Last Name</label>
        <input className='modal__input' type="email" name="user_email" placeholder='Preferably your social media one'/>
        <label className='label'>Email</label>
        <input className='modal__input' type="email" name="user_email" placeholder='Preferably your social media one'/>
      </form>
                </div>
                <div className="modal__xbody-left">
                    <h4>Summary</h4>
                    <p>2 x  The event title goes here</p>
                    <div className="modal__payment-sumary">
                        <div className="modal__payment-info">
                            <div className="modal_subtotal">
                                <p>Sub-total</p>
                                <p>₦8000</p>
                            </div>
                            <div className="modal_subtotal">
                                <p>Service charge</p>
                                <p>₦40</p>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="modal__total">
                        <p>Total</p>
                        <p className='total__madal-price'><b>₦8040</b></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CheckingOut