import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import CreateTicket from "./CreateTicket";
import HostEventDetail from "./HostEventDetail";
import PublishEvent from "./PublishEvent";
import { AddEventDetails } from "../../apis/EventsApis";

const StepperForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [hostEventDetail, setHostEventDetail] = useState({});
  const [verificationError, setVerificationError] = useState("");
  const [formData, setFormData] = useState({
    hostEventDetail: {},
    createTicket: {},
    publishEvent: {},
  });

  const navigate = useNavigate();

  const handleNext = (stepData) => {
    let a = { ...formData, ...stepData };
    setFormData(a);
    console.log("set data", stepData);
    console.log("form data", formData);
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const { isLoading, error, isError, mutateAsync, data } = useMutation(
    "create event",
    AddEventDetails,
    {
      onSuccess: (data) => {
        if (data && data.success) {
          // Adjust the condition based on the response data structure
          navigate("/success");
        } else {
          // Verification unsuccessful
          setVerificationError("Something is wrong");
          // You can perform any additional actions here, such as showing an error message
        }
      },
    }
  );

  const handleSubmit = () => {
    // Perform submission logic with formData
    mutateAsync(formData);
    navigate("/success");
  };

  return (
    <div>
      {currentStep === 1 && (
        <HostEventDetail onNext={handleNext} formData={formData} />
      )}
      {currentStep === 2 && (
        <CreateTicket
          onNext={handleNext}
          onPrev={handlePrev}
          formData={formData}
        />
      )}
      {currentStep === 3 && (
        <PublishEvent
          onPrev={handlePrev}
          onSubmit={handleSubmit}
          formData={formData}
        />
      )}
    </div>
  );
};

export default StepperForm;
