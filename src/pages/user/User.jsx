import React, { useState } from 'react'
import BlogPostWishList from '../../components/Wishlist/BlogPostWishList';
import Footer from '../../components/Footer';
import AppNavbar from '../../components/AppNavBar';
import {RiShareForwardLine} from 'react-icons/ri'
import Profile from '../../assets/Autor1.png'
import './user.css'
import AccountSetting from '../../components/Users/AccountSetting';
import Subscriptions from '../../components/Users/Subscriptions';
import LetsTalk from '../../components/Users/LetsTalk';
import ProfileInfo from '../../components/App/ProfileInfo';
import Tabs from '../../components/App/Tabs';
import UserProfile from '../../components/Users/UserProfile';
import UserTabs from '../../components/Users/UserTabs';
import BusinessAccountSetting from '../../components/Business/BusinessAccountSettings';
import AdsHistory from '../../components/Business/AdsHistory';
import PromotionHistory from '../../components/Business/PromotionHistory';
import EmailMarketing from '../../components/Users/EmailMarketing';

const User = () => {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <>
    <AppNavbar />
    <div className="user-container ">
      <div className="user__bloc-tabs">
        <div className="user__bloc-profile">
        <img src={Profile} />
        <h4>Purple Closet</h4>
        </div>
        <button
          className={toggleState === 1 ? "user__tabs active-user__tabs" : "user__tabs"}
          onClick={() => toggleTab(1)}
        >
          Business Profile
        </button>
        <button
          className={toggleState === 2 ? "user__tabs active-user__tabs" : "user__tabs"}
          onClick={() => toggleTab(2)}
        >
          Account Settings
        </button>
        <button
          className={toggleState === 3 ? "user__tabs active-user__tabs" : "user__tabs"}
          onClick={() => toggleTab(3)}
        >
          Ads & Promotions
        </button>
        <button
          className={toggleState === 4 ? "user__tabs active-user__tabs" : "user__tabs"}
          onClick={() => toggleTab(4)}
        >
         Email Marketing
        </button>
        <button
          className={toggleState === 5 ? "user__tabs active-user__tabs" : "user__tabs"}
          onClick={() => toggleTab(5)}
        >
        Insights
        </button>
        <button
          className={toggleState === 6 ? "user__tabs active-user__tabs" : "user__tabs"}
          onClick={() => toggleTab(6)}
        >
         Let’s Talk
        </button>
        
      </div>

      <div className="user__content-tabs">
        <div className={toggleState === 1 ? "user__contentx  active-user__content" : "user__contentx"}>
            <div className="first__user-content">
             
              <h3>Business Profile</h3>
              
              </div>
              
             <UserProfile /> 
             <UserTabs />
        </div>
        
          <div className={toggleState === 2 ? "user__contentx  active-user__content" : "user__contentx"}>
            <div className="first__user-content">
              <h3>Account Settings</h3>
              </div>
            <div className="account__settings__tab__content">
              <BusinessAccountSetting/>
            </div>  
        </div>

        <div className={toggleState === 3 ? "user__contentx  active-user__content" : "user__contentx"}>
            <div className="first__user-content">
              <h3>Ads & Promotions</h3>
              </div>
            <div className="account__settings__tab__content">
              <AdsHistory/>
              <br/><br/><br/><br/>
              <PromotionHistory />
            </div>  
        </div>

        <div className={toggleState === 4 ? "user__contentx  active-user__content" : "user__contentx"}>
            <div className="first__user-content">
              <h3>Email Marketing</h3>
              </div>
            <div className="account__settings__tab__content">
              <EmailMarketing />
            </div>  
        </div>

        <div
          className={toggleState === 5 ? "user__contentx  active-user__content" : "user__contentx"}
        >
          <div className='subscription__section'>
          <div className="first__user-content subscription__user-content">
          <h3>Insights</h3>
              
        </div>
        <p>Today</p>
        </div>
         <Subscriptions />
        </div>

        <div
          className={toggleState === 6 ? "user__contentx  active-user__content" : "user__contentx"}
        >

          <div className="first__user-content subscription__user-content">
          <h3>Let's Talk</h3>
              

       
        </div>
         <LetsTalk />
        </div>
      </div>
    </div>
    <br/><br/><br/><br/><br/><br/>
    <Footer />
    </>
  );
}


export default User
