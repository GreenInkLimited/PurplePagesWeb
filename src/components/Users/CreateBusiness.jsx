import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { MdClear } from 'react-icons/md';
import { RiImageAddLine } from 'react-icons/ri';
import { AddBusiness } from '../../apis/BusinessApi';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri'

const CreateBusiness = ({ closeModal }) => {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState('No File Selected');
  const [verificationError, setVerificationError] = useState('');
  const [previewURL, setPreviewURL] = useState(null);

  const [isActive, setIsActive] = useState(false)
  const [isActiveLocation, setIsActiveLocation] = useState(false)
  const [isActiveLga, setIsActiveLga] = useState(false)
  const [isActiveCategory, setIsActiveCategory] = useState(false)
  const [isActiveMarket, setIsActiveMarket] = useState(false)

  const [selected, setSelected] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedLga, setSelectedLga] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedMarket, setSelectedMarket] = useState("");
  
  const options = ['registered', 'not registered']
  const locations = ['Lagos', 'Oyo', 'Ekiti', 'FCT', 'Ibadan', 'Kwara', 'Sokoto', 'Jos', 'PortHaecourt']
  const lgas = ['apapa', 'mainland', 'wuse 2', 'Asokoro']
  const categories = ["Education", "Food & drinks", "Fashion", "Technology", "Logistics", "Entertainment", "Agriculture", "Finance", "Construction", "Pharmaceuticals", "Branding & Marketing", "Others"]
  const markets = ["Jiji", "Jumia", "Bumpa", "Pocket", "Shopify", "Flutterwave", "Others"]
  const navigate = useNavigate();

  const { isLoading, error, isError, mutateAsync, data } = useMutation('create business', AddBusiness, {
  onSuccess: (data) => {
    if (data && data.status_lean) {
      const business_id = data.id;
      localStorage.setItem('id', business_id);
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

  const handleCACUpload = (event) => {
    const file = event.target.files[0];
    // Handle CAC certificate upload logic
  };

  const initialValues = {
  image: null,
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


 

  const handleSubmit = async (values) => {
    const updatedValues = {
    
    ...values,
    image: image,
    business_type : selected,
    location: selectedLocation,
    lga: selectedLga,
    category: selectedCategory,
    marketplace: selectedMarket,
    }
    try {
      
      const response = await mutateAsync(updatedValues);
      if (response && response.status_lean) {
        const businessId = response.id;
        
        localStorage.setItem('business_id', businessId);
        
        // Verification successful
        navigate('/personal');
      } else {
        // Verification unsuccessful
        setVerificationError('Something is wrong');
        // You can perform any additional actions here, such as showing an error message
      }
    } catch (error) {
      // Handle error
    }
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
                  accept="image/jpeg, image/png"
                  name="image"
                  hidden
                  onChange={handleLogoUpload}
                />
                {previewURL ? (
                  <img src={previewURL} alt={fileName} className="uploaded-image" />
                ) : (
                <RiImageAddLine color="#EBB8FC" />
                  )}
              </div>
              <small>Your image should be in JPEG or PNG format</small>
              <label>Business Name</label>
              <Field className="input" type="text" name="name" placeholder="placeholder text" />
              <div className='create__business__row'>
                <div>
                  <label>Business Type</label>
<Field name="business_type">
  {({ field }) => (
    <div className="dropdown">
      <div
        className="dropdown-btn"
        onClick={() => setIsActive(!isActive)}
      >
        {selected || field.value || "Select Type"} {/* Add the placeholder text */}
        <div className="dropdown-icons">
        {isActive ? <RiArrowUpSLine className="dropdown-icon"/> : <RiArrowDownSLine className="dropdown-icon"/>}
        </div>
      </div>
      {isActive && (
        <div className="dropdown-content">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => {
                setSelected(option);
                setIsActive(false);
                field.onChange({ target: { value: option } });
              }}
              className="dropdown-item"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  )}
</Field>
                </div>
                <div>

                  
                  <label>RC Number</label>
                  <Field className="input" type="text" name="rc_number" placeholder="If applicable" />
                </div>
              </div>
              <div className='create__business__row'>
                <div>
                  <label>Business Location</label>
                  <Field name="location">
  {({ field }) => (
    <div className="dropdown">
      <div
        className="dropdown-btn"
        onClick={() => setIsActiveLocation(!isActiveLocation)}
      >
        {selectedLocation || field.value || "Select Location"} {/* Add the placeholder text */}
        <div className="dropdown-icons">
        {isActiveLocation ? <RiArrowUpSLine className="dropdown-icon"/> : <RiArrowDownSLine className="dropdown-icon"/>}
        </div>
      </div>
      {isActiveLocation && (
        <div className="dropdown-content">
          {locations.map((option) => (
            <div
              key={option}
              onClick={() => {
                setSelectedLocation(option);
                setIsActiveLocation(false);
                field.onChange({ target: { value: option } });
              }}
              className="dropdown-item"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  )}
  
</Field>
                </div>
                <div>
                  <label>Business Location (LGA)</label>
                  <Field name="lga">
  {({ field }) => (
    <div className="dropdown">
      <div
        className="dropdown-btn"
        onClick={() => setIsActiveLga(!isActiveLga)}
      >
        {selectedLga || field.value || "Select Location (Lga)"} {/* Add the placeholder text */}
        <div className="dropdown-icons">
        {isActiveLga ? <RiArrowUpSLine className="dropdown-icon"/> : <RiArrowDownSLine className="dropdown-icon"/>}
        </div>
      </div>
      {isActiveLga && (
        <div className="dropdown-content">
          {lgas.map((option) => (
            <div
              key={option}
              onClick={() => {
                setSelectedLga(option);
                setIsActiveLga(false);
                field.onChange({ target: { value: option } });
              }}
              className="dropdown-item"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  )}
</Field>
                </div>
              </div>
              <label>Business Address</label>
              <Field className="input" type="text" name="address" placeholder="placeholder text" />
              <div className='create__business__row'>
                <div>
                  <label>Business Email</label>
                  <Field className="input" type="text" name="email" placeholder="" />
                </div>
                <div>
                  <label>Business Phone Number</label>
                  <Field className="input" type="text" name="phone" placeholder="" />
                </div>
              </div>
              <label>Business Category</label>
              <Field name="category" className="input">
  {({ field }) => (
    <div className="dropdownx">
      <div
        className="dropdown-btn"
        onClick={() => setIsActiveCategory(!isActiveCategory)}
      >
        {selectedCategory || field.value || "Select Type"} {/* Add the placeholder text */}
        <div className="dropdown-icons">
        {isActiveCategory ? <RiArrowUpSLine className="dropdown-icon"/> : <RiArrowDownSLine className="dropdown-icon"/>}
        </div>
      </div>
      {isActiveCategory && (
        <div className="dropdown-content">
          {categories.map((option) => (
            <div
              key={option}
              onClick={() => {
                setSelectedCategory(option);
                setIsActiveCategory(false);
                field.onChange({ target: { value: option } });
              }}
              className="dropdown-item"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  )}
</Field>
              <div className='create__business__row'>
                <div>
                  <label>Your Marketplace</label>
                  
                  <Field name="marketplace">
  {({ field }) => (
    <div className="dropdown">
      <div
        className="dropdown-btn"
        onClick={() => setIsActiveMarket(!isActiveMarket)}
      >
        {selectedMarket || field.value || "Select Market"} {/* Add the placeholder text */}
        <div className="dropdown-icons">
        {isActiveMarket ? <RiArrowUpSLine className="dropdown-icon"/> : <RiArrowDownSLine className="dropdown-icon"/>}
        </div>
      </div>
      {isActiveMarket && (
        <div className="dropdown-content">
          {markets.map((option) => (
            <div
              key={option}
              onClick={() => {
                setSelectedMarket(option);
                setIsActiveMarket(false);
                field.onChange({ target: { value: option } });
              }}
              className="dropdown-item"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  )}
  
</Field>
                </div>
                <div>
                  <label>Marketplace  Link</label>
                  <Field className="input" type="text" name="marketplace_link" placeholder="" />
                </div>
              </div>
              <label>Business Website (If any)</label>
              <Field className="input" type="text" name="website" placeholder="" />

              <label>Describe your business</label>
              <Field as="textarea" className="textarea" name="description" placeholder="What seems to be the problem?" />

              <small>
                If you’re registered, kindly upload a snapshot of your CAC certificate. If not, kindly upload any valid form
                of identification e.g NIN slip, int’l passport, driver’s license e.t.c
              </small>

              
              

              

              <button className='subscribe' type="submit">
                {isLoading ? 'Submitting...' : 'Submit'}
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CreateBusiness;