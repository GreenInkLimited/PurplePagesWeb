import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { MdClear } from 'react-icons/md';
import { RiImageAddLine } from 'react-icons/ri';
import { SendMail } from '../../apis/BusinessApi'; 
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';

const SendMailModal = ({ onCancel, businessId }) => {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState('No File Selected');
  const [verificationError, setVerificationError] = useState('');
  const [previewURL, setPreviewURL] = useState(null);

  const handleCancel = () => {
    onCancel(); // Invoke the onCancel function passed from the parent component
  };

  const navigate = useNavigate();

  const { isLoading, error, isError, mutateAsync, data } = useMutation('send mail', SendMail, {
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
    subject: '',
    mail: '',
    
    price: '',
    color: '',
    bundle: '',
    business_id: businessId,
  };

  const handleSubmit = (values) => {
  const updatedValues = {
    ...values,
    business_id: businessId,
    file: image, // Include the image value
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

                <label>Subject of mail</label>
                  <Field className="input" type="text" name="subject" placeholder="Enter discount" />

                  <label>Content of mail</label>
              <Field className="textarea" name="mail" placeholder="Enter caption" />
              <label>Upload your photo(s)/video</label>
              

            <label>Bundle</label>
            <Field className="input" type="text" name="bundle" placeholder="Enter discount" />
            
            <label>Price</label>
            <Field className="input" type="text" name="price" placeholder="Enter discount" />

              <button className='user_user__button' type="submit">Submit</button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SendMailModal;