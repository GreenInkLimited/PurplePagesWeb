import React, { useState } from "react";
import CorporateAccount from "./CorporateAccount";
import HostYourEvent from "./HostYourEvent";
import PersonalAccount from "./PersonalAccount";

const HostEventModal = ({ closeModal }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleProceed = (option) => {
    setSelectedOption(option);
  };

  const handleGoBack = () => {
    setSelectedOption(null);
  };

  return (
    <div className="host-modal__background form">
      {!selectedOption && (
        <HostYourEvent onProceed={handleProceed} closeModal={closeModal} />
      )}
      {selectedOption === "personal" && (
        <PersonalAccount goBack={handleGoBack} />
      )}
      {selectedOption === "corporate" && (
        <CorporateAccount goBack={handleGoBack} />
      )}
    </div>
  );
};

export default HostEventModal;
