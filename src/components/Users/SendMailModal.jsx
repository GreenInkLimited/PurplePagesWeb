import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { MdClear } from 'react-icons/md';
import { RiImageAddLine } from 'react-icons/ri';
import { SendMail } from '../../apis/BusinessApi';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import BundleSelectionModal from './BundleSelectionModal';

const SendMailModal = ({ onCancel, businessId }) => {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState('No File Selected');
  const [previewURL, setPreviewURL] = useState(null);
  const [showBundleModal, setShowBundleModal] = useState(false);
  const [selectedBundle, setSelectedBundle] = useState(null);

  const handleCancel = () => {
    onCancel();
  };

  const navigate = useNavigate();

  const { mutateAsync } = useMutation('send mail', SendMail, {
    onSuccess: (data) => {
      if (data && data.status_lean) {
        navigate('/personal');
      } else {
        // Handle error
      }
    },
    onError: (error) => {
      console.error('Error sending mail:', error);
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
  };

  const handleSubmit = async (values) => {
  if (selectedBundle) {
    const updatedValues = {
      ...values,
      file: image,
      price: selectedBundle.price,
      bundle: selectedBundle.bundle,
      business_id: businessId,
    };

    try {
      await mutateAsync(updatedValues);
      navigate('/personal');
    } catch (error) {
      console.error('Error sending mail:', error);
      // Handle error
    }
  } else {
    // Handle bundle not selected error
  }
};

  const handleOpenBundleModal = () => {
    setShowBundleModal(true);
  };

  const handleCloseBundleModal = () => {
    setShowBundleModal(false);
  };

  const handleBundleSelect = (bundle) => {
    setSelectedBundle(bundle);
    handleCloseBundleModal();
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
        <p className="send__mail-gist">Send email to your subscribers</p>
        <div className="create__business-body">
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
              <label>Subject of mail</label>
              <Field className="input" type="text" name="subject" placeholder="Enter discount" />

              <label>Content of mail</label>
              <Field className="textarea" name="mail" placeholder="Enter caption" />

              <label>Upload your photo(s)/video</label>
              <div
                className="upload__file-container"
                onClick={() => document.querySelector('.logo-input').click()}
              >
                <input
                  type="file"
                  accept="image/*, video/*"
                  style={{ display: 'none' }}
                  className="logo-input"
                  onChange={handleLogoUpload}
                />
                {previewURL ? (
                  <img src={previewURL} alt={fileName} className="uploaded-image" />
                ) : (
                  <RiImageAddLine color="#EBB8FC" />
                )}
              </div>

              <div className="create__binex-button">
                <button className="user_user__button" type="submit" onClick={handleOpenBundleModal}>
                  Select Bundle
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
      {showBundleModal && (
        <BundleSelectionModal
          onCancel={handleCloseBundleModal}
          onBundleSelect={handleBundleSelect}
          businessId={businessId}
        />
      )}
    </div>
  );
};

export default SendMailModal;