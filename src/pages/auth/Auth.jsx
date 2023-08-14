import React from "react";
import Signup from "../../components/Auth/Signup";
import "./auth.css";
import Footer from "../../components/Footer";

const Auth = () => {
  return (
    <>
      <Signup />
      <div className="the__footer__signup">
        <Footer />
      </div>
    </>
  );
};

export default Auth;
