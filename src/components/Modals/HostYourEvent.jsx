import React, { useState, useEffect, useRef } from "react";
import Personal from "../../assets/Personal.png";
import Corporate from "../../assets/Corporate.png";
import CorporateSelected from "../../assets/CorporateSelected.png";
import PersonalSelected from "../../assets/PersonalSelected.png";
import Logo from "../../assets/pplogo.png";
import { AiOutlineClose } from "react-icons/ai";

function HostYourEvent({ onProceed, closeModal }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedImage, setSelectedImage] = useState(Personal);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setSelectedImage(
      option === "personal" ? PersonalSelected : CorporateSelected
    );
  };

  const handleProceedClick = () => {
    onProceed(selectedOption);
  };

  const modalRef = useRef(null); // Reference to the modal element

  const handleClickOutsideModal = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideModal);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideModal);
    };
  }, []);

  return (
    <div className="host__event-wrappers" ref={modalRef}>
      <div className="host__event-wrappers-icons">
        <AiOutlineClose onClick={() => closeModal(false)} />
        <img src={Logo} alt="Logo" />
        <p></p>
      </div>
      <div className="host__event-wrappers-header">
        <h2>Let’s get you started</h2>
        <p className="host__event-wrappers-paragraph">
          Choose the account type that suits you and your event.
        </p>
      </div>
      <div className="host__event-body__container">
        <button onClick={() => handleOptionSelect("personal")}>
          <div
            className={`host__event-body ${
              selectedOption === "personal" ? "selected" : ""
            }`}
          >
            <img
              src={selectedOption === "personal" ? PersonalSelected : Personal}
              alt="Personal"
            />
            <h4>Personal</h4>
            <p>
              Ideal for individuals and group of friends or people hosting
              events
            </p>
          </div>
        </button>
        <button onClick={() => handleOptionSelect("corporate")}>
          <div
            className={`host__event-body ${
              selectedOption === "corporate" ? "selected" : ""
            }`}
          >
            <img
              src={
                selectedOption === "corporate" ? CorporateSelected : Corporate
              }
              alt="Corporate"
            />
            <h4>Corporate</h4>
            <p>Best suited for companies and brands hosting events</p>
          </div>
        </button>
      </div>
      {selectedOption && (
        <button className="select" onClick={handleProceedClick}>
          Proceed with {selectedOption}
        </button>
      )}
      <p className="host__event-footer">
        Or <a href="/auth/">login</a> if you already have an existing account
      </p>
    </div>
  );
}

export default HostYourEvent;
