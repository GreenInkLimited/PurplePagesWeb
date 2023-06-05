import React, { useState } from 'react'
import { MdClear } from 'react-icons/md';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { AddAdmin } from '../../apis/BusinessApi';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';

const AddAdminModal = ({ isOpen, onClose, businessId }) => {
    const [verificationError, setVerificationError] = useState('');

    const navigate = useNavigate();

    const { isLoading, error, isError, mutateAsync, data } = useMutation('add admin', AddAdmin, {
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
    username: '',
    business_id: businessId,
  };

  const handleSubmit = (values) => {
    const updatedValues = {
      ...values,
      business_id: businessId,
    };
    mutateAsync(updatedValues);
  };
  return (
    <div className="add__admin-container">
    <div className={`custom-modal ${isOpen ? 'open' : ''}`}>
      <div className="add__adminmodal-wrapper">
        <h3>Add Admin</h3>
        <MdClear className="close-button" onClick={onClose} />
      </div>

      
    </div>
    <hr/>
    <div className="add-admin__body">
        <Formik  initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
                 <label>Admin Username</label>
                <Field className="input" type="text" name="username" placeholder="Placeholder text" />
        <p>With admin access, this user can do the following:</p>
        <div className="with__admin-access">
            <h4>Content</h4>
            <p>Create, manage or delete posts, blogs and other things on your business account</p>
        </div>
        <div className="with__admin-access">
            <h4>Reviews and Replies</h4>
            <p>Can respond to reviews and comment on blog posts</p>
        </div>
        <div className="with__admin-access">
            <h4>Ads & Promos</h4>
            <p>Can create, manage and delete ads and promos for the business</p>
        </div>
        <div className="with__admin-access">
            <h4>Insight</h4>
            <p>Can see and download insights about the business</p>
        </div>
        <div className='give__access-container'>
        <button className="user_user__button" type="submit">
                  {isLoading ? 'Granting Access...' : 'Guve Access'}
                </button>
        </div>
        </Form>
        
        </Formik>
      </div>
    </div>
  );
};

export default AddAdminModal;
