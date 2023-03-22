import { useState } from "react";
import {AiOutlineGlobal, AiOutlineMail, } from "react-icons/ai"
import {BsTelephone} from "react-icons/bs"
import {CiLocationOn} from "react-icons/ci"
import { Link } from "react-router-dom";
import ProductAndService from "../App/ProductAndService";
import Reviews from "../App/Reviews";
import Marketplace1 from "../../assets/Marketplace1.png"
import Marketplace2 from "../../assets/Marketplace2.png"
import Marketplace3 from "../../assets/Marketplace3.png"
import Edit from "../../assets/write.png"
import UserProductAndService from "./UserProductAndServices";
import Subscriptions from "./Subscriptions";


function UserTabs() {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return(
    <div>
      <div className="bloc-user__utabs">
        <button
          className={toggleState === 1 ? "user__utabs active-user__utabs" : "user__utabs"}
          onClick={() => toggleTab(1)}
        >
          ABOUT US
        </button>
        <button
          className={toggleState === 2 ? "user__utabs active-user__utabs" : "user__utabs"}
          onClick={() => toggleTab(2)}
        >
          PRODUCT & SERVICES
        </button>
        <button
          className={toggleState === 3 ? "user__utabs active-user__utabs" : "user__utabs"}
          onClick={() => toggleTab(3)}
        >
          BlOG
        </button>
        <button
          className={toggleState === 4 ? "user__utabs active-user__utabs" : "user__utabs"}
          onClick={() => toggleTab(4)}
        >
          REVIEWS
        </button>
      </div>

      <div className="content-user__utabs">
        <div className="first-content-user__utab__container">
        <div
          className={toggleState === 1 ? "user__utab__content  active-user__utab__content" : "user__utab__content"}
        >
            <div className="first__user__utab__content">
        <div className="user__submenu__content">
          <h4>Bio</h4>
           <img src={Edit} alt="edit"/>
        </div>  
          <p>
            Lorem ipsum dolor sit amet consectetur. Ligula gravida bibendum et a mi orci. Et adipiscing eget lorem aliquet maecenas. Dui sit est scelerisque erat odio accumsan congue praesent. Felis porttitor eget.
          </p>
        <div className="user__submenu__content">
          <h4>Contact Information</h4>
          <img src={Edit} alt="edit"/>
        </div>  
          <div className="user__utabs__information">
            <small><AiOutlineGlobal className="icon"/>www.charlies-bagel.com</small>
            <small><AiOutlineMail  className="icon"/>info@charlies.bagel.com</small>
            <small><BsTelephone   className="icon"/>+ 234 812 345 6789</small>
           
            <div className="user__utabs__location">
                <CiLocationOn   className="icon"/>
            <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut</small>
            </div>
          </div>
        
        <div className="user__submenu__content">
         <h4>Marketplace</h4>
         <img src={Edit} alt="edit"/>
        </div>
          
          <div className="user__utabs__marketplace">
            <img src={Marketplace1} />
             <img src={Marketplace2} />
              <img className="jumia__marketplace" src={Marketplace3} />
          </div>
        </div>
        </div>
        </div>

        <div
          className={toggleState === 2 ? "user__utab__contentx  active-user__utab__content" : "user__utab__contentx"}
        >
          <UserProductAndService/>
        </div>
         
        <div
          className={toggleState === 3 ? "user__utab__contentx  active-user__utab__content" : "user__utab__contentx"}
        >
         <div className="reviews__utab">
          <Subscriptions />
          </div>
          
        </div>
        <div
          className={toggleState === 4 ? "user__utab__contentx  active-user__utab__content" : "user__utab__contentx"}
        >
         <div className="reviews__utab">

          </div>
          <Reviews />
        </div>
      </div>
    </div>
  );
}

export default UserTabs;