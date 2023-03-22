import React, {useRef, useState} from 'react'
import {AiOutlineClose, AiOutlineMinus, AiOutlinePlus} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import Event from '../../assets/yourevent.png'
import './modal.css'


const Modal = ({closeModal}) => {
    const form = useRef();
  return (
    
    <div className='modal__background'>
        
          
        <div className="modal__container">
            
            <div className="modal__header">
                <div className="modal__title">
                <img src={Event} />
                    <div className='model__text'>
                    <h4>The event title goes here</h4>
                    <p>Saturday, February 4 | 5-6pm</p>
                    <small>Location</small>
                    </div>
                </div>
                <AiOutlineClose  className='close__my-modal' onClick={()=> closeModal(false)}/>
            </div>
            <h2>Ticket Information</h2>
            <div className="modal__body">
                <div className="modal__body-left">
                    
                    <p>How many tickets do you want to buy</p>
                    <div className="modal__inrease-desrease">
                        <div className="modal__decreament">
                            <AiOutlineMinus />
                        </div>
                        <p>1</p>
                        <div className="modal__increament">
                            <AiOutlinePlus />
                        </div>
                        
                    </div>
                    <div className="subtotal_update">
                        <p>Subtotal: ₦4000</p>
                    </div>
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
            <div className="modal__footer">
                <Link to="/checkout">
                    <button>proceed</button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Modal