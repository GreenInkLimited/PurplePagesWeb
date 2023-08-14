import React from "react";
import { MdOutlineClose } from "react-icons/md";

const AdsbannerModal = ({ imageUrl, onClose }) => {
  return (
    <div className="custom__ads-modal">
      <div className="modal__ads-content">
        <button className="modal__ads-close" onClick={onClose}>
          <MdOutlineClose />
        </button>
        <img src={imageUrl} alt="Large Image" className="modal__ads-image" />
      </div>
    </div>
  );
};

export default AdsbannerModal;
