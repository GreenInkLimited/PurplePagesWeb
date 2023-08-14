import { useEffect, useState } from "react";
import { AiOutlineGlobal, AiOutlineMail } from "react-icons/ai";
import { BsTelephone } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { useParams } from "react-router-dom";
import Reviews from "../App/Reviews";
import Marketplace0 from "../../assets/pocketnew.png";
import Marketplace1 from "../../assets/jijinew.png";
import Marketplace2 from "../../assets/shopifynew.png";
import Marketplace3 from "../../assets/jumianew.png";
import Marketplace4 from "../../assets/bumpanew.png";
import Marketplace5 from "../../assets/flutterwavenew.png";
import Edit from "../../assets/write.png";
import UserProductAndService from "./UserProductAndServices";
import { getMyBusinessById } from "../../apis/BusinessApi";
import Logo from "../../assets/pplogo.png";
import UserBlog from "./UserBlog";

function UserTabs() {
  const [toggleState, setToggleState] = useState(1);
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const businessData = await getMyBusinessById({ id });
        setBusiness(businessData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bio:", error);
      }
    };

    fetchBusiness();
  }, [id]);

  if (loading) {
    return (
      <div className="spinner_container">
        <img src={Logo} alt="Loading" />
      </div>
    );
  }

  return (
    <div>
      <div className="bloc-user__utabs">
        <button
          className={
            toggleState === 1 ? "user__utabs active-user__utabs" : "user__utabs"
          }
          onClick={() => toggleTab(1)}
        >
          ABOUT US
        </button>
        <button
          className={
            toggleState === 2 ? "user__utabs active-user__utabs" : "user__utabs"
          }
          onClick={() => toggleTab(2)}
        >
          PRODUCT & SERVICES
        </button>
        <button
          className={
            toggleState === 3 ? "user__utabs active-user__utabs" : "user__utabs"
          }
          onClick={() => toggleTab(3)}
        >
          BLOG
        </button>
        <button
          className={
            toggleState === 4 ? "user__utabs active-user__utabs" : "user__utabs"
          }
          onClick={() => toggleTab(4)}
        >
          REVIEWS
        </button>
      </div>

      <div className="content-user__utabs">
        <div className="first-content-user__utab__container">
          <div
            className={
              toggleState === 1
                ? "user__utab__content  active-user__utab__content"
                : "user__utab__content"
            }
          >
            <div className="first__user__utab__content">
              <div className="user__submenu__content">
                <h4>Bio</h4>
                <img src={Edit} alt="edit" />
              </div>
              <p>{business?.description}</p>
              <div className="user__submenu__content">
                <h4>Contact Information</h4>
                <img src={Edit} alt="edit" />
              </div>
              <div className="user__utabs__information">
                <small>
                  <AiOutlineGlobal className="icon" />
                  {business?.website}
                </small>
                <small>
                  <AiOutlineMail className="icon" />
                  {business?.email}
                </small>
                <small>
                  <BsTelephone className="icon" />
                  {business?.phone}
                </small>

                <div className="user__utabs__location">
                  <CiLocationOn className="icon" />
                  <small>{business?.address}</small>
                </div>
              </div>

              <div className="user__submenu__content">
                <h4>Marketplace</h4>
                <img src={Edit} alt="edit" />
              </div>

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
            toggleState === 2
              ? "user__utab__contentx  active-user__utab__content"
              : "user__utab__contentx"
          }
        >
          <UserProductAndService />
        </div>

        <div
          className={
            toggleState === 3
              ? "user__utab__contentx  active-user__utab__content"
              : "user__utab__contentx"
          }
        >
          <div className="reviews__utab">
            <UserBlog />
          </div>
        </div>
        <div
          className={
            toggleState === 4
              ? "user__utab__contentx  active-user__utab__content"
              : "user__utab__contentx"
          }
        >
          <div className="reviews__utab"></div>
          <Reviews />
        </div>
      </div>
    </div>
  );
}

export default UserTabs;
