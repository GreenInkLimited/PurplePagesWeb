import React from 'react'
import {BsCircle, BsCheckCircleFill} from 'react-icons/bs'
import {RiDeleteBin6Line} from 'react-icons/ri'
import {AiOutlinePlus} from 'react-icons/ai'
import User from '../../assets/comment.png'

const BusinessAccountSetting = () => {
  return (
    <>
    <div  className='business__account-header'>
      <h4>
        Connect Socials
      </h4>
      <p>Connect your social media pages to place ads there</p>
      
    </div>
      <div className="business__settings-content">
        <div className="account__settings--left">
          <p>Connect Facebook</p>
          <p>Connect to Instagram</p>
          <p>Connect to Twitter</p>
        </div>
        <div className="account__settings--right">
          <p>Connect</p>
          <p>Connect</p>
          <p>Connect</p>
          
        </div>
      </div>
      <div className="notifications">
        <div className="notification__mobile">
        <h4>Notification Preferences</h4>
        </div>
      <div className="notification__preferences">
        <h4>Notification Preferences</h4>
        <div className='pust__email-notification'>
        <p>Push</p>
        <p>Emails</p>
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
       <div  className='admin__access__option business__account-header'>
      <h4>
        Admin Access
      </h4>
      <div className="business__account__addadmin">
      <p>You can add or remove purple pages users as your business admin</p>
      <h4>Add Admin</h4>
      </div>
    </div>
      <div className="admin__lists">
            <div className="admin__list__username">
            <img src={User} />
            <p>Purple peaches</p>
        </div>
            <RiDeleteBin6Line className='delete__admin'/>
      </div>
      <div className="admin__lists">
        <div className="admin__list__username">
            <img src={User} />
            <p>Purple peaches</p>
        </div>
            <RiDeleteBin6Line className='delete__admin' />
      </div>
      <div className='business__account__addadmin-mobile'>
        <div>

        </div>
      <div className="business__account__addadmin-mobile-left">
          <AiOutlinePlus /> Admin
      </div>
      </div>
    </>
  )
}

export default BusinessAccountSetting
