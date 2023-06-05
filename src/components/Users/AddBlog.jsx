import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { MdClear } from 'react-icons/md';
import { RiImageAddLine } from 'react-icons/ri';
import { WriteBlog } from '../../apis/BusinessApi';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';

const AddBlog = ({ onCancel, businessId }) => {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState('No File Selected');
  const [verificationError, setVerificationError] = useState('');
  const [previewURL, setPreviewURL] = useState(null);

  const handleCancel = () => {
    onCancel(); // Invoke the onCancel function passed from the parent component
  };

  const navigate = useNavigate();

  const { isLoading, error, isError, mutateAsync, data } = useMutation('add product', WriteBlog, {
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
    title: '',
    detail: '',
    tags: '',
    image: '',
    business_id: businessId,
  };

  const handleSubmit = (values) => {
    const updatedValues = {
      ...values,
      business_id: businessId,
      image: image,
    };
    mutateAsync(updatedValues);
  };

  return (
    <div className="container">
      <div className="create__business-container">
        <div className="create__business-header">
          <MdClear onClick={handleCancel} />
          <div className="create__business-detail">
            <h4>Add Blog</h4>
          </div>
        </div>
        <div className="create__business-body">
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
                <Field name="title" type="text" className='write-blog__title__label' placeholder='Title...'/>
              <label>Upload your photo(s)/video</label>
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
              <small>Your image should be in JPEG or PNG format and video in mp4</small>
              

             

              <label>Content</label>
              <Field as="textarea" className="textarea" name="detail" placeholder="Enter caption" />

              <label>Tags</label>
              <Field className="input" type="text" name="tags" placeholder="Enter product title" />
              <button className='user_user__button' type="submit">Submit</button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;