import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import AppNavbar from "../../components/AppNavBar";
import Profile from "../../assets/Autor1.png";
import "./personalAccount.css";
import AccountSetting from "../../components/Users/AccountSetting";
import Subscriptions from "../../components/Users/Subscriptions";
import LetsTalk from "../../components/Users/LetsTalk";
import { getUser } from "../../apis";

const PersonalAccount = () => {
  const [toggleState, setToggleState] = useState(1);
  const [userInfo, setUserInfo] = useState(null);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser({ pageParam: 0 });
        setUserInfo(response);
      } catch (error) {
        console.log("Error fetching User:", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <AppNavbar />
      <div className="personal-container container">
        <div className="personal__bloc-tabs">
          {userInfo && (
            <div className="personal__bloc-profile">
              <img src={userInfo.image} alt="images" />
              <h4>{userInfo.username}</h4>
            </div>
          )}

          <button
            className={
              toggleState === 1
                ? "personal__tabs active-personal__tabs"
                : "personal__tabs"
            }
            onClick={() => toggleTab(1)}
          >
            Account Settings
          </button>

          <button
            className={
              toggleState === 2
                ? "personal__tabs active-personal__tabs"
                : "personal__tabs"
            }
            onClick={() => toggleTab(2)}
          >
            Subscriptions
          </button>
          <button
            className={
              toggleState === 3
                ? "personal__tabs active-personal__tabs"
                : "personal__tabs"
            }
            onClick={() => toggleTab(3)}
          >
            Let’s Talk
          </button>
        </div>

        <div className="personal__content-tabs">
          <div
            className={
              toggleState === 1
                ? "personal__contentx  active-personal__content"
                : "personal__contentx"
            }
          >
            <div className="first__personal-content">
              <h3>Account Settings</h3>
            </div>
            <AccountSetting />
          </div>

          <div
            className={
              toggleState === 2
                ? "personal__contentx  active-personal__content"
                : "personal__contentx"
            }
          >
            <div className="subscription__section">
              <div className="first__personal-content subscription__personal-content">
                <h3>Subscriptions</h3>
                <h4>Manage</h4>
              </div>
              <p>Today</p>
            </div>
            <Subscriptions />
          </div>

          <div
            className={
              toggleState === 3
                ? "personal__contentx  active-personal__content"
                : "personal__contentx"
            }
          >
            <div className="first__personal-content subscription__personal-content">
              <h3>Let's Talk</h3>
            </div>
            <LetsTalk />
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
};

export default PersonalAccount;
