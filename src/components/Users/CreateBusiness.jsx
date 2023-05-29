import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { MdClear } from 'react-icons/md';
import { RiImageAddLine } from 'react-icons/ri';
import { AddBusiness } from '../../apis/BusinessApi';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';

const CreateBusiness = ({ closeModal }) => {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState('No File Selected');
  const [verificationError, setVerificationError] = useState('');

  const navigate = useNavigate();

  const { isLoading, error, isError, mutateAsync, data } = useMutation('create business', AddBusiness, {
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
      setImage(URL.createObjectURL(file));
    }
  };

  const handleCACUpload = (event) => {
    const file = event.target.files[0];
    // Handle CAC certificate upload logic
  };

  const initialValues = {
    image: '',
    name: '',
    business_type: '',
    rc_number: '',
    category: '',
    location: '',
    lga: '',
    description: '',
    phone: '',
    email: '',
    website: '',
    address: '',
    marketplace: '',
    marketplace_link: '',
  };

  const handleSubmit = (values) => {
    // Handle form submission
    mutateAsync(values);
  };

  return (
    <div className="container">
      <div className="create__business-container">
        <div className="create__business-header">
          <span className="close" onClick={closeModal}>
            <MdClear />
          </span>
          <div className="create__business-detail">
            <h4>Create Business</h4>
          </div>
        </div>
        <div className="create__business-body">
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
              <label>Upload your logo (optional)</label>
              <div className="upload__file-container" onClick={() => document.querySelector('.logo-input').click()}>
                <Field
                  className="input-field logo-input"
                  type="file"
                  accept="image/*"
                  name="image"
                  hidden
                  onChange={handleLogoUpload}
                />
                {image ? <img src={image} alt={fileName} className="uploaded-image" /> : <RiImageAddLine color="#EBB8FC" />}
              </div>
              <small>Your image should be in JPEG or PNG format</small>
              <label>Business Name</label>
              <Field
                className="input"
                type="text"
                name="name"
                placeholder="placeholder text"
              />
              <div className='create__business__row'>
               <div>
              <label>Business Type</label>
              <Field
                className="input"
                type="text"
                name="business_type"
                placeholder="Registered"
              />
              </div>
              <div>
              <label>RC Number</label>
              <Field
                className="input"
                type="text"
                name="rc_number"
                placeholder="If applicable"
              />
              </div>
              </div>
              <div className='create__business__row'>
               <div>
              <label>Business Location</label>
              <Field
                className="input"
                type="text"
                name="location"
                placeholder=""
              />
              </div>
              <div>
              <label>Business Location (LGA)</label>
              <Field
                className="input"
                type="text"
                name="lga"
                placeholder=""
              />
              </div>
              </div>
              <label>Business Address</label>
              <Field
                className="input"
                type="text"
                name="address"
                placeholder="placeholder text"
              />
               <div className='create__business__row'>
               <div>
              <label>Business Email</label>
              <Field
                className="input"
                type="text"
                name="email"
                placeholder=""
              />
              </div>
              <div>
              <label>Business Phone Number</label>
              <Field
                className="input"
                type="text"
                name="phone"
                placeholder=""
              />
              </div>
              </div>
              <label>Business Category</label>
              <Field
                className="input"
                type="text"
                name="category"
                placeholder="placeholder text"
              />
               <div className='create__business__row'>
               <div>
              <label>Your Marketplace</label>
              <Field
                className="input"
                type="text"
                name="marketplace"
                placeholder=""
              />
              </div>
              <div>
              <label>Marketplace  Link</label>
              <Field
                className="input"
                type="text"
                name="marketplace_link"
                placeholder=""
              />
              </div>
              </div>
              <label>Business Website (If any)</label>
              <Field
                className="input"
                type="text"
                name="website"
                placeholder=""
              />
              
              <label>Describe your business</label>
              <Field className="textarea" name="description" placeholder="What seems to be the problem?" />
              
              <small>
                If you’re registered, kindly upload a snapshot of your CAC certificate. If not, kindly upload any valid form
                of identification e.g NIN slip, int’l passport, driver’s license e.t.c
              </small>

              <div className="upload__cac-container" onClick={() => document.querySelector('.cac-input').click()}>
                <Field
                  className="input-field cac-input"
                  type="file"
                  accept="image/*"
                  name="cac_certificate"
                  hidden
                  onChange={handleCACUpload}
                />
                {image ? <img src={image} alt={fileName} className="uploaded-image" /> : <RiImageAddLine color="#EBB8FC" />}
              </div>
              <small>Your image should be in JPEG or PNG format</small>

              <button type="submit">Submit</button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CreateBusiness;