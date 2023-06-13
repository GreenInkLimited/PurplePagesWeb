import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { MdClear } from 'react-icons/md';
import { RiImageAddLine } from 'react-icons/ri';
import { UpdateMailSettings } from '../../apis/BusinessApi'; 
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';

const UpdateMailModal = ({ onCancel, businessId }) => {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState('No File Selected');
  const [verificationError, setVerificationError] = useState('');
  const [previewURL, setPreviewURL] = useState(null);

  const handleCancel = () => {
    onCancel(); // Invoke the onCancel function passed from the parent component
  };

  const navigate = useNavigate();

  const { isLoading, error, isError, mutateAsync, data } = useMutation('Update mail', UpdateMailSettings, {
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

  const handleLogoUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    setFileName(file.name);
    setImage(file);
    const previewURL = URL.createObjectURL(file);
    setPreviewURL(previewURL);
  }
};

  

  const initialValues = {
    email_host: 'p3plmcpnl489403.prod.phx3.secureserver.net',
    email_host_user: '',
    
    email_host_password: '',
    email_port: 587,
    business_id: businessId,
  };

  const handleSubmit = (values) => {
  const updatedValues = {
    ...values,
    business_id: businessId,
 // Include the image value
  };
  mutateAsync(updatedValues)
  .then((data) => {
    // Handle success
  })
  .catch((error) => {
    console.error('Error sending mail:', error);
  });
};


  return (
    <div className="container">
      <div className="create__business-container">
        <div className="create__business-header">
          <MdClear onClick={handleCancel} />
          <div className="create__business-detail">
            <h4>Send mail to subscribers</h4>
          </div>
        </div>
        <p className='send__mail-gist'>Send email to your subscribers</p>
        <div className="create__business-body">
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>

                <label>Email Host User</label>
                  <Field className="input" type="text" name="email_host_user" placeholder="Enter discount" />
              

            <label>Email Host Password</label>
            <Field className="input" type="text" name="email_host_password" placeholder="Enter discount" />
            
              <div className='create__binex-button'>
              <button className='user_user__button' type="submit">Submit</button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default UpdateMailModal;