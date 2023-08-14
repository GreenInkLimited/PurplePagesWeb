import React from "react";
import Confirmation from "../../assets/Confirmation.png";

const SuccessModal = () => {
  return (
    <div className="modal__background">
      <div className="modal__containerpp">
        <img
          className="modal__success-img"
          src={Confirmation}
          alt="confirmation"
        />
        <p>Your event has been published</p>
        <a href="https://usepurplepages.com/events">
          <button className="personal__input button">Go To Events</button>
        </a>
      </div>
    </div>
  );
};

export default SuccessModal;
