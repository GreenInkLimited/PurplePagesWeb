import React from 'react'
import {BsCircle, BsCheckCircleFill} from 'react-icons/bs'
import {AiOutlineEdit} from 'react-icons/ai'

const AccountSetting = () => {
  return (
    <>
    <div  className='account__settings-header'>
      <h4>
        Profile
      </h4>
      <div className='account__settings-edit'>
          <p>Edit</p>
          <AiOutlineEdit className='edit_icon'/>
      </div>
      
    </div>
      <div className="account__settings-content">
        <div className="account__settings-left">
          <p>Username</p>
          <p>First Name</p>
          <p>Last Name</p>
          <p>Email</p>
          <p>Phone Number</p>
          <p>Password</p>
        </div>
        <div className="account__settings-right">
          <p>Purplecloset</p>
          <p>Purple</p>
          <p>Closet</p>
          <p>Purplecloset@gmail.com</p>
          <p>+234 0000 000 0000</p>
          <p>**********</p>
        </div>
      </div>
      <div className="notifications">
      <div className="notification__preferences">
        <h4>Notification Preferences</h4>
        <div className='pust__email-notification'>
        <p>Push</p>
        <p>Email</p>
        </div>
      </div>
      <div className="notification__preferences-body">
        <div>
        <p>Subscriptions</p>
        <small>Notify me about activity from the businesses I’m subscribed to</small>
        </div>
        <div className="subscriptions-detail">
          <BsCircle />
          <BsCheckCircleFill className='check'/>
        </div>
        
      </div>
      <div className="notification__preferences-body">
        <div>
        <p>Business settings</p>
        <small>To change notification preferences for each subscribed business.</small>
        </div>
        <div className="subscriptions-detail">
          <BsCheckCircleFill className='check'/>
          <BsCircle />
        </div>
        
      </div>
      <div className="notification__preferences-body">
        <div>
        <p>Replies to my comments</p>
        <small>Notify me about replies to my comments</small>
        </div>
        <div className="subscriptions-detail">
          <BsCheckCircleFill className='check'/>
          <BsCircle />
        </div>
        
      </div>
      </div>
    </>
  )
}

export default AccountSetting
