import React, { useEffect, useState } from "react";
import { MdClear } from "react-icons/md";

import { BsCheck2Circle } from "react-icons/bs";
import { getMyBusinessById } from "../../apis/BusinessApi";
import { useParams } from "react-router-dom";
import PlanDetailsModal from "../Users/PlanDetailsModal";
import AdsDetailsModal from "./AdsDetailsModal";

const PostAdsModal = ({ onCloseModal }) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState("daily");
  const [showPlanDetailsModal, setShowPlanDetailsModal] = useState(false);
  const [business, setBusiness] = useState(null);
  const handlePlanSelection = (planType) => {
    setSelectedPlan(planType);
  };

  const handleGetStarted = () => {
    setShowPlanDetailsModal(true);
  };

  const handleClosePlanDetailsModal = () => {
    setShowPlanDetailsModal(false);
  };

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const businessData = await getMyBusinessById({ id });
        setBusiness(businessData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching business:", error);
      }
    };

    fetchBusiness();
  }, [id]);

  return (
    <>
      {showPlanDetailsModal ? (
        <AdsDetailsModal
          selectedPlan={selectedPlan}
          onCloseModal={handleClosePlanDetailsModal}
          businessId={id}
        />
      ) : (
        <div className="promote__modal-container">
          <div className="promote__modal-wrapper">
            <MdClear className="promote__modal-clear" onClick={onCloseModal} />
            <h2>Simple and transparent pricing {business?.name}</h2>
            <p>Straight to the point pricing plans.</p>
          </div>
          <div className="promote__modal-types">
            <button
              className={selectedPlan === "daily" ? "active" : ""}
              onClick={() => handlePlanSelection("daily")}
            >
              Daily
            </button>
            <button
              className={selectedPlan === "weekly" ? "active" : ""}
              onClick={() => handlePlanSelection("weekly")}
            >
              Weekly
            </button>
            <button
              className={selectedPlan === "monthly" ? "active" : ""}
              onClick={() => handlePlanSelection("monthly")}
            >
              Monthly
            </button>
          </div>
          <div className="promote__modal-body">
            {selectedPlan === "daily" && (
              <>
                <div className="promote__modal-content right">
                  <div className="promote__content-container">
                    <p>Basic Plan</p>
                    <h2 className="promote__duration">
                      <span className="naira_font">₦</span>400 /{" "}
                      <small>Daily</small>
                    </h2>
                    <div className="promote__plan-packs">
                      <small>
                        <BsCheck2Circle /> Your product/blog/brand gets
                        visibility
                      </small>
                      <small>
                        <BsCheck2Circle /> Can select more than a day
                      </small>
                      <small>
                        <BsCheck2Circle /> Featured in one location
                      </small>
                    </div>
                    <div className="promote__button-container">
                      <button
                        className="promote__button"
                        onClick={handleGetStarted}
                        businessId={id}
                      >
                        Get started
                      </button>
                    </div>
                  </div>
                </div>
                <div className="promote__modal-content left">
                  <div className="promote__content-container">
                    <p>Premium Plan</p>
                    <h2>
                      <span className="naira_font">₦</span>700 /{" "}
                      <small>Daily</small>
                    </h2>
                    <div className="promote__plan-packs">
                      <small>
                        <BsCheck2Circle /> You get way more visibility
                      </small>
                      <small>
                        <BsCheck2Circle /> Featured in various locations
                      </small>
                      <small>
                        <BsCheck2Circle /> Access to AI generated designs
                      </small>
                    </div>
                    <div className="promote__button-container">
                      <button
                        className="promote__button"
                        onClick={handleGetStarted}
                        businessId={id}
                      >
                        Get started
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
            {selectedPlan === "weekly" && (
              <>
                <div className="promote__modal-content right">
                  <div className="promote__content-container">
                    <p>Basic Plan</p>
                    <h2 className="promote__duration">
                      <span className="naira_font">₦</span>2500 /{" "}
                      <small>Weekly</small>
                    </h2>
                    <div className="promote__plan-packs">
                      <small>
                        <BsCheck2Circle /> Your product/blog/brand gets
                        visibility
                      </small>
                      <small>
                        <BsCheck2Circle /> Can select more than a day
                      </small>
                      <small>
                        <BsCheck2Circle /> Featured in one location
                      </small>
                    </div>
                    <div className="promote__button-container">
                      <button
                        className="promote__button"
                        onClick={handleGetStarted}
                        businessId={id}
                      >
                        Get started
                      </button>
                    </div>
                  </div>
                </div>
                <div className="promote__modal-content left">
                  <div className="promote__content-container">
                    <p>Premium Plan</p>
                    <h2>
                      <span className="naira_font">₦</span>4000 /{" "}
                      <small>Weekly</small>
                    </h2>
                    <div className="promote__plan-packs">
                      <small>
                        <BsCheck2Circle /> You get way more visibility
                      </small>
                      <small>
                        <BsCheck2Circle /> Featured in various locations
                      </small>
                      <small>
                        <BsCheck2Circle /> Access to AI generated designs
                      </small>
                    </div>
                    <div className="promote__button-container">
                      <button
                        className="promote__button"
                        onClick={handleGetStarted}
                        businessId={id}
                      >
                        Get started
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
            {selectedPlan === "monthly" && (
              <>
                <div className="promote__modal-content right">
                  <div className="promote__content-container">
                    <p>Basic Plan</p>
                    <h2 className="promote__duration">
                      <span className="naira_font">₦</span>8000 /{" "}
                      <small>Monthly</small>
                    </h2>
                    <div className="promote__plan-packs">
                      <small>
                        <BsCheck2Circle /> Your product/blog/brand gets
                        visibility
                      </small>
                      <small>
                        <BsCheck2Circle /> Can select more than a day
                      </small>
                      <small>
                        <BsCheck2Circle /> Featured in one location
                      </small>
                    </div>
                    <div className="promote__button-container">
                      <button
                        className="promote__button"
                        onClick={handleGetStarted}
                        businessId={id}
                      >
                        Get started
                      </button>
                    </div>
                  </div>
                </div>
                <div className="promote__modal-content left">
                  <div className="promote__content-container">
                    <p>Premium Plan</p>
                    <h2>
                      <span className="naira_font">₦</span>14000 /{" "}
                      <small>Monthly</small>
                    </h2>
                    <div className="promote__plan-packs">
                      <small>
                        <BsCheck2Circle /> You get way more visibility
                      </small>
                      <small>
                        <BsCheck2Circle /> Featured in various locations
                      </small>
                      <small>
                        <BsCheck2Circle /> Access to AI generated designs
                      </small>
                    </div>
                    <div className="promote__button-container">
                      <button
                        className="promote__button"
                        onClick={handleGetStarted}
                        businessId={id}
                      >
                        Get started
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PostAdsModal;
