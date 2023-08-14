import React from "react";
import { Link } from "react-router-dom";

const HostEvent = () => {
  return (
    <div className="container host__event__container">
      <h2>Ready to host your event?</h2>
      <Link className="link btn white" to="/">
        Let’s Get Started
      </Link>
    </div>
  );
};

export default HostEvent;
