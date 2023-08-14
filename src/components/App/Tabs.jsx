import { useState, useEffect } from "react";
import { AiOutlineGlobal, AiOutlineMail } from "react-icons/ai";
import { BsTelephone } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import ProductAndService from "./ProductAndService";
import { Link, useParams } from "react-router-dom";
import Reviews from "./Reviews";
import Marketplace0 from "../../assets/pocketnew.png";
import Marketplace1 from "../../assets/jijinew.png";
import Marketplace2 from "../../assets/shopifynew.png";
import Marketplace3 from "../../assets/jumianew.png";
import Marketplace4 from "../../assets/bumpanew.png";
import Marketplace5 from "../../assets/flutterwavenew.png";
import { getBusinessById } from "../../apis/BusinessApi";
import Logo from "../../assets/pplogo.png";
import ReviewModal from "./ReviewModal";

function Tabs() {
  const { id } = useParams();
  const [toggleState, setToggleState] = useState(1);
  const [loading, setLoading] = useState(true);
  const [business, setBusiness] = useState(null);
  const [showModal, setShowModal] = useState(false); // Add the state variable

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const businessData = await getBusinessById({ id });
        setBusiness(businessData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching business:", error);
      }
    };

    fetchBusiness();
  }, [id]);

  if (loading) {
    return (
      <div className="spinner_container">
        <img src={Logo} />
      </div>
    );
  }

  return (
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
            className={
              toggleState === 1 ? "content  active-content" : "content"
            }
          >
            <div className="first__content">
              <h4>Description</h4>

              <p>{business.description}</p>
              <hr />

              <h4>Contact Information</h4>

              <div className="tabs__information">
                <small>
                  <AiOutlineGlobal className="icon" />
                  {business.website}
                </small>
                <small>
                  <AiOutlineMail className="icon" />
                  {business.email}
                </small>
                <small>
                  <BsTelephone className="icon" />
                  {business.phone}
                </small>

                <div className="location">
                  <CiLocationOn className="icon" />
                  <small>{business.address}</small>
                </div>
              </div>
              <hr />

              <h4>Marketplace</h4>
              <p>Click on any marketplace below to shop with us</p>
              <br />
              <div className="user__utabs__marketplace">
                <a href={business.marketplace_link}>
                  {business.marketplace === "Jiji" && (
                    <img src={Marketplace1} alt="jiji" />
                  )}
                </a>
                <a href={business.marketplace_link}>
                  {business.marketplace === "Jumia" && (
                    <img
                      src={Marketplace3}
                      alt="jiji"
                      className="jumia__marketplace"
                    />
                  )}
                </a>
                <a href={business.marketplace_link}>
                  {business.marketplace === "Bumpa" && (
                    <img
                      src={Marketplace4}
                      alt="jiji"
                      className="jumia__marketplace"
                    />
                  )}
                </a>
                <a href={business.marketplace_link}>
                  {business.marketplace === "Pocket" && (
                    <img src={Marketplace0} alt="jiji" />
                  )}
                </a>
                <a href={business.marketplace_link}>
                  {business.marketplace === "Shopify" && (
                    <img src={Marketplace2} alt="jiji" />
                  )}
                </a>
                <a href={business.marketplace_link}>
                  {business.marketplace === "Flutter" && (
                    <img src={Marketplace5} alt="jiji" />
                  )}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          className={
            toggleState === 2 ? "contentx  active-content" : "contentx"
          }
        >
          <ProductAndService />
        </div>

        <div
          className={
            toggleState === 3 ? "contentx  active-content" : "contentx"
          }
        >
          <div className="reviews__tab">
            <h4>Purple Pages User Reviews & Ratings</h4>

            <button className="subscribe" onClick={openModal} businessId={id}>
              Leave a review
            </button>
          </div>
          <Reviews />
        </div>
      </div>

      {/* Render the modal when showModal is true */}
      {showModal && (
        <div className="modal">
          <ReviewModal closeModal={closeModal} businessId={id} />
        </div>
      )}
    </div>
  );
}

export default Tabs;
