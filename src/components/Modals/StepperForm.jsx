import React, { useState } from 'react';
import CreateTicket from './CreateTicket';
import HostEventDetail from './HostEventDetail';
import PublishEvent from './PublishEvent';

const StepperForm = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div>
      {currentStep === 1 && (
        <HostEventDetail onNext={handleNext} />
      )}
      {currentStep === 2 && (
        <CreateTicket onNext={handleNext} onPrev={handlePrev} />
      )}
      {currentStep === 3 && (
        <PublishEvent onPrev={handlePrev} />
      )}
    </div>
  );
};

export default StepperForm;