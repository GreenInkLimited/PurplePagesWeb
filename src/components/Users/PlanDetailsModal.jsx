import React, { useState } from 'react';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { PromoteBusiness } from '../../apis/BusinessApi';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';

const PlanDetailsModal = ({ selectedPlan, onCloseModal, businessId }) => {
  const [verificationError, setVerificationError] = useState('');
  const planDetails = {
    daily: {
      title: 'Daily Plan',
      price: '400',
      duration: 'Daily',
      plans: 'Basic'
    },
    daily_premium: {
      title: 'Daily Plan',
      price: '700',
      duration: 'Daily',
      plans: 'Premium'
    },
    weekly: {
      title: 'Weekly Plan',
      price: '2500',
      duration: 'Weekly',
      plans: 'Basic'
    },
    weekly_premium: {
      title: 'Weekly Plan',
      price: '4000',
      duration: 'Weekly',
      plans: 'Premium'
    },
    monthly: {
      title: 'Monthly Plan',
      price: '8000',
      plans: 'Basic'
    },
    monthly_premium: {
      title: 'Premium Plan',
      price: '14000',
      duration: 'Daily',
      plans: 'Premium'
    },
  };

  const selectedPlanDetails = planDetails[selectedPlan];
  const navigate = useNavigate();
  const { isLoading, error, isError, mutateAsync, data } = useMutation('promote business', PromoteBusiness, {
    onSuccess: (data) => {
      if (data && data.status_lean) {
        // Verification successful
        navigate('/personal');
      } else {
        // Verification unsuccessful
        setVerificationError('Something is wrong');
        // You can perform any additional actions here, such as showing an error message
      }
    },
  });

  const initialValues = {
    duration: '',
    location: '',
    business_id: businessId,
  };

  const handleSubmit = async (values) => {
    const { location, duration } = values;

    try {
      
      const response = await PromoteBusiness({
        ads_type: selectedPlan,
        price: selectedPlanDetails.price,
        plan: selectedPlanDetails.title,
        duration,
        location,
        business_id: businessId, // Pass the businessId prop to the PromoteBusiness API
      });

      console.log('PromoteBusiness response:', response);
      // Handle success, e.g., show a success message
    } catch (error) {
      console.error('PromoteBusiness error:', error);
      // Handle error, e.g., show an error message
    }
  };

  console.log('businessId:', businessId);

  return (
    <div className='plan-details-modal-container'>
      <div className='plan-details-modal-header'>
        <BiLeftArrowAlt className='plan-details-modal-close' onClick={onCloseModal} />
        <h2>Promote Business</h2>
      </div>
      <div className='plan-details-modal-wrapper'>
        <p>
          Duration: <span>{selectedPlanDetails.title}</span>
        </p>
        <p>
          Plan: <span>{selectedPlanDetails.plans}</span>
        </p>
        <p>
          Price: <span>
            {selectedPlanDetails.price} / {selectedPlanDetails.duration}
          </span>
        </p>
      </div>

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <label>Choose Location</label>
          <Field className="input" type="text" name="location" placeholder="Enter location" />
          <label>Choose Duration</label>
          <Field className="input" type="text" name="duration" placeholder="Enter duration" />
          <div className="promote__button-container">
            <button className='user_user__button' type="submit">Proceed to make payment</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default PlanDetailsModal;