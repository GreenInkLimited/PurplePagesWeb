import React, { useState } from "react";
import CorporateAccount from "./CorporateAccount";
import HostYourEvent from "./HostYourEvent";
import PersonalAccount from "./PersonalAccount";

const HostEventModal = ({ closeModal }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleProceed = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="host-modal__background form">
      {!selectedOption && <HostYourEvent onProceed={handleProceed} />}
      {selectedOption === "personal" && <PersonalAccount />}
      {selectedOption === "corporate" && <CorporateAccount />}
    </div>
  );
};

export default HostEventModal;