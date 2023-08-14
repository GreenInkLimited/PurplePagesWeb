import React, { useState } from "react";
import { MdClear } from "react-icons/md";
import { logoutUser } from "../../apis";
import { useNavigate } from "react-router-dom";

const SignOut = ({ closeModal }) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logoutUser();
      localStorage.clear();
      navigate(`/signin`);
      // Perform any additional actions after successful signout
      // For example, clear local storage or redirect to the sign-in page
    } catch (error) {
      // Handle error during signout process
    }
  };

  return (
    <div className="modal__background-signout ">
      <div className="create__business-container-signout">
        <div className="create__business-header">
          <span className="close" onClick={closeModal}>
            <MdClear />
          </span>
          <div className="create__business-detail">
            <h4>Are you sure you want to sign out?</h4>
          </div>
        </div>
        <div className="create__business-body-signout">
          <div className="promote__button-containerxx">
            <button
              className="user_user__button__cancel"
              type="button"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              className="user_user__button__signout"
              type="button"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignOut;
