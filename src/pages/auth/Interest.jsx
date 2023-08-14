import React, { useRef, useState } from "react";
import Logo from "../../assets/pplogo.png";
import { interest } from "../../data";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
import "./auth.css";
import Footer from "../../components/Footer";
import { AddInterest } from "../../apis";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

const Interest = () => {
  const form = useRef();
  const navigate = useNavigate();
  const [selectedInterests, setSelectedInterests] = useState([]);

  const handleInterestClick = (id) => {
    const selectedInterest = interest.find((item) => item.id === id);
    if (selectedInterest) {
      // Check if the interest is already selected
      const isAlreadySelected = selectedInterests.some(
        (interest) => interest.id === id
      );
      if (isAlreadySelected) {
        setSelectedInterests(
          selectedInterests.filter((interest) => interest.id !== id)
        );
      } else {
        setSelectedInterests([...selectedInterests, selectedInterest]);
      }
    }
  };

  const { isLoading } = useMutation("interest", AddInterest);

  const isInterestSelected = (id) => {
    return selectedInterests.some((interest) => interest.id === id);
  };

  const handleSubmit = async () => {
    try {
      // Call the API function to add interests
      await AddInterest({ interest: selectedInterests });
      // Redirect or perform any other necessary action after successful submission
      navigate("/apphome");
      console.log("Interests submitted successfully");
    } catch (error) {
      console.error("Failed to submit interests", error);
    }
  };

  const isButtonDisabled = selectedInterests.length < 3;
  const buttonClass = isButtonDisabled ? "submit_disabled" : "submit";

  return (
    <>
      <div className="container interest__wrapper">
        <div className="container signup_wrapper">
          <div className="signup__content interesting">
            <Link to="/">
              <img src={Logo} alt="logo" />
            </Link>
            <h1>What are you interested in?</h1>
            <div className="signup_paragraph">
              <p>Choose 3 or more to continue</p>
            </div>
          </div>
        </div>
        <div className="all__interests">
          {interest.map(({ id, name }) => (
            <div
              className={`interest__categories ${
                isInterestSelected(id) ? "selected" : ""
              }`}
              key={id}
              onClick={() => handleInterestClick(id)}
            >
              <div
                className={`interest__content ${
                  isInterestSelected(id) ? "isselected" : ""
                }`}
              >
                <p>{name}</p>
                {isInterestSelected(id) ? (
                  <AiOutlineCheck />
                ) : (
                  <AiOutlinePlus />
                )}
              </div>
            </div>
          ))}
        </div>
        <button
          className={buttonClass}
          disabled={isButtonDisabled}
          onClick={handleSubmit}
        >
          {isLoading ? "Submitting..." : "Go Home"}
        </button>
      </div>

      <div className="the__footer__signup">
        <Footer />
      </div>
    </>
  );
};

export default Interest;
