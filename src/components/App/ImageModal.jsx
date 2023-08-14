import React from "react";
import { MdOutlineClose } from "react-icons/md";

const ImageModal = ({ imageUrl, alt, onClose }) => {
  return (
    <div className="modal__overlay" onClick={onClose}>
      <div className="modal__content">
        <MdOutlineClose className="close-icon" onClick={onClose} />
        <img src={imageUrl} alt={alt} className="modal__image" />
      </div>
    </div>
  );
};

export default ImageModal;
