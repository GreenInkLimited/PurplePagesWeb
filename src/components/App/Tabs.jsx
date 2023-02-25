import { useState } from "react";
import {AiOutlineGlobal, AiOutlineMail, } from "react-icons/ai"
import {BsTelephone} from "react-icons/bs"
import {CiLocationOn} from "react-icons/ci"
import ProductAndService from "./ProductAndService";
import { Link } from "react-router-dom";
import Reviews from "./Reviews";

function Tabs() {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return(
    <div>
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          ABOUT US
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          PRODUCT & SERVICES
        </button>
        <button
          className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(3)}
        >
          REVIEWS
        </button>
      </div>

      <div className="content-tabs container">
        <div className="first-content-container">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
            <div className="first__content">
          <h4>Description</h4>
          
          <p>
            Lorem ipsum dolor sit amet consectetur. Ligula gravida bibendum et a mi orci. Et adipiscing eget lorem aliquet maecenas. Dui sit est scelerisque erat odio accumsan congue praesent. Felis porttitor eget.
          </p>
           <hr />

          <h4>Contact Information</h4>
          
          <div className="tabs__information">
            <small><AiOutlineGlobal className="icon"/>www.charlies-bagel.com</small>
            <small><AiOutlineMail  className="icon"/>info@charlies.bagel.com</small>
            <small><BsTelephone   className="icon"/>+ 234 812 345 6789</small>
           
            <div className="location">
                <CiLocationOn   className="icon"/>
            <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut</small>
            </div>
          </div>
        <hr />

         <h4>Marketplace</h4>
         <p>
            Click on any marketplace below to shop with us
          </p>
          
          <div className="tabs__marketplace">
            <small className="tabs__marketplace">Pocket</small>
            <small className="tabs__marketplace">Shopify</small>
            <small className="tabs__marketplace">Jumia Market</small>
            <small className="tabs__marketplace">Jiji</small>
          </div>
        </div>
        </div>
        </div>

        <div
          className={toggleState === 2 ? "contentx  active-content" : "contentx"}
        >
          <ProductAndService />
        </div>
         
        <div
          className={toggleState === 3 ? "contentx  active-content" : "contentx"}
        >
         <div className="reviews__tab">
          <h4>Purple user reviews & ratings</h4>
          
           <Link className='subscribe' to="">Leave a review</Link>
          </div>
          <Reviews />
        </div>
      </div>
    </div>
  );
}

export default Tabs;