import React from "react";
import { MdClear, MdRadioButtonUnchecked, MdCheckCircle } from "react-icons/md";

const BundleSelectionModal = ({
  onCancel,
  onBundleSelect,
  onSubmit,
  businessId,
}) => {
  const bundleOptions = [
    { bundle: "0 - 100 subscribers", price: "500" },
    { bundle: "100 - 250 subscribers", price: "1000" },
    { bundle: "250 - 500 subscribers", price: "1500" },
    { bundle: "500 - 1000 subscribers", price: "3000" },
    { bundle: "1000 - 5000 subscribers", price: "5000" },
    { bundle: "5000 & more subscribers", price: "8000" },
  ];

  const handleCancel = () => {
    onCancel();
  };

  const handleBundleSelect = (bundle) => {
    onBundleSelect(bundle);
  };

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <div className="container">
      <div className="create__business-container">
        <div className="create__business-header">
          <MdClear onClick={handleCancel} />
          <div className="create__business-detail">
            <h4>Choose Bundle</h4>
          </div>
        </div>
        <p className="send__mail-gist">Choose preferred marketing bundle</p>
        {bundleOptions.map((option, index) => (
          <div
            className="choose__bundle-body"
            key={index}
            onClick={() => handleBundleSelect(option)}
          >
            <div className="choose__bundle-content">
              <MdRadioButtonUnchecked />
              <p>{option.bundle}</p>
            </div>
            <h2>
              {option.price} <small>/ Mail</small>
            </h2>
          </div>
        ))}
        <div className="create__binex-button">
          <button className="user_user__button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default BundleSelectionModal;
