import React, { useState } from 'react'
import Footer from '../../components/Footer';
import AppNavbar from '../../components/AppNavBar';
import Profile from '../../assets/Evnt.png'
import AccountSetting from '../../components/Users/AccountSetting';
import Subscriptions from '../../components/Users/Subscriptions';
import LetsTalk from '../../components/Users/LetsTalk';
import FeaturedEvents from '../../components/Users/FeaturedEvents';
import UpcomingEvents from '../../components/Users/UpcomingEvents';
import YourEvents from '../../components/Users/YourEvents';


const UserEvents = () => {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <>
    <AppNavbar />
    <div className="personal-container container">
      <div className="personal__bloc-tabs">
        <div className="personal__bloc-profile">
        <img src={Profile} />
        <h4>Events</h4>
        </div>
        
        <button
          className={toggleState === 1 ? "personal__tabs active-personal__tabs" : "personal__tabs"}
          onClick={() => toggleTab(1)}
        >
          Featured Events
        </button>
        
        
        <button
          className={toggleState === 2 ? "personal__tabs active-personal__tabs" : "personal__tabs"}
          onClick={() => toggleTab(2)}
        >
         History
        </button>
        <button
          className={toggleState === 3 ? "personal__tabs active-personal__tabs" : "personal__tabs"}
          onClick={() => toggleTab(3)}
        >
         Your Events
        </button>
        
      </div>

      <div className="personal__content-tabs">
        
        
          <div className={toggleState === 1 ? "personal__contentx  active-personal__content" : "personal__contentx"}>
            <div className="first__personal-content">
                <h3>Featured Events</h3>
            </div>
            <FeaturedEvents /> 
        </div>

        <div
          className={toggleState === 2 ? "personal__contentx  active-personal__content" : "personal__contentx"}
        >
          <div className="first__personal-content">

          <h3>History</h3>
        </div>
         <UpcomingEvents />
        </div>

        <div
          className={toggleState === 3 ? "personal__contentx  active-personal__content" : "personal__contentx"}
        >

          <div className="first__personal-content">
          <h3>Your Events</h3>
              

       
        </div>
         <YourEvents />
        </div>
      </div>
    </div>
    <br/><br/><br/><br/><br/><br/>
    <Footer />
    </>
  );
}


export default UserEvents
