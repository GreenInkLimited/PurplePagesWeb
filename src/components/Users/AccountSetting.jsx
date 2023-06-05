import React, { useEffect, useState } from 'react';
import { BsCircle, BsCheckCircleFill } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getUser, UpdateProfile } from '../../apis';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import ChangePassword from '../Modals/ChangePassword';

const AccountSetting = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [openModal, setOpenModal] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const validationSchema = Yup.object({
    last_name: Yup.string().required('Field is required'),
    first_name: Yup.string().required('Field is required'),
    phone: Yup.string().required('Field number is required'),
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser({ pageParam: 0 });
        setUser(response); // Set the user state with the response data directly
      } catch (error) {
        console.log('Error fetching User:', error);
      }
    };
    fetchUser();
  }, []);

  const { isLoading, error, isError, mutateAsync, data } = useMutation(
    'accountsetting',
    UpdateProfile,
    {
      onSuccess: (data) => {
        console.log(data);
        //localStorage.setItem('auth_code', data.auth_code);
        // Redirect to home page after successful form submission
        navigate('/personal');
      },
    }
  );

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedUser(user); // Store a copy of the user data for editing
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <>
      {openModal && <ChangePassword closeModal={setOpenModal} />}
      <div className='account__settings-header'>
        <h4>Profile</h4>

        {isEditing ? (
          <div className='account__settings-save'>
            <>
              <button className='cancel' onClick={handleCancelClick}>Cancel</button>
            </>
          </div>
        ) : (
          <div className='account__settings-edit'>
            <>
              <button onClick={handleEditClick}> Edit  <AiOutlineEdit /></button>
            </>
          </div>
        )}

      </div>
      <div className="account__settings-content">
        <div className="account__settings-left">
          <p>Username</p>
          <p>First Name</p>
          <p>Last Name</p>
          <p>Email</p>
          <p>Phone Number</p>
          <p>Password</p>
        </div>
        <Formik
          initialValues={{ first_name: "", last_name: "", phone: "" }}
          onSubmit={async (values) => {
            await mutateAsync({
              first_name: values.first_name,
              last_name: values.last_name,
              phone: values.phone,
            });
            console.log(values);
          }}
          validationSchema={validationSchema}
        >
          {({ isSubmitting }) => (
            <Form>
              {user && (
                <div className="account__settings-right">
                  <p>
                    <label htmlFor="username">Username</label>
                    {isEditing ? (

                      <input
                        className='inputing'
                        type="text"
                        name="username"
                        value={editedUser.username}
                        onChange={handleInputChange}
                      />
                    ) : (
                      user.username
                    )}
                  </p>
                  <p>
                     <label htmlFor="username">First Name</label>
                    {isEditing ? (
                      
                      <Field
                        className="inputing"
                        type="text"
                        name="first_name"
                        placeholder={editedUser.first_name}
                        required="true"
                      />
                    ) : (
                      user.first_name || 'first name'
                    )}
                    <ErrorMessage name="first_name" component="small" className="error-message" />
                  </p>
                  <p>
                    <label htmlFor="username">Last Name</label>
                    {isEditing ? (
                      <Field
                        className="inputing"
                        type="text"
                        name="last_name"
                        placeholder={editedUser.last_name}
                        required="true"
                      />
                    ) : (
                      user.last_name || 'last name'
                    )}
                    <ErrorMessage name="last_name" component="small" className="error-message" />
                  </p>
                  <p>
                    <label htmlFor="username">Email</label>
                    {isEditing ? (
                      <input
                        className='inputing'
                        type="email"
                        name="email"
                        value={editedUser.email}
                        onChange={handleInputChange}
                      />
                    ) : (
                      user.email
                    )}
                  </p>
                  <p>
                    <label htmlFor="username">Phone Number</label>
                    {isEditing ? (
                      <Field
                        className="inputing"
                        type="tel"
                        name="phone"
                        placeholder={editedUser.phone}
                        required="true"
                      />
                    ) : (
                      user.phone
                    )}
                  </p>
                  <p>
                    <label htmlFor="username">Password</label>
                    {isEditing ? (
                      <div className='input__divx'>
                        <input
                          className='inputingxyz'
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          placeholder="********"
                          onChange={handleInputChange}
                        />
                        <button
                          type="button"
                          className="password-toggle-button"
                          onClick={togglePasswordVisibility}
                        >{showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </button>
                      </div>
                    ) : (
                      <p className='password__setmodal_button' onClick={() => { setOpenModal(true) }}>*******</p>
                    )}
                  </p>
                </div>
              )}
              {isEditing && <button className='save_profile-button' type="submit" disabled={isSubmitting}>Save</button>}
            </Form>
          )}
        </Formik>
      </div>

      <div className="notifications">
        <div className="notification__preferences">
          <h4>Notification Preferences</h4>
          <div className='pust__email-notification'>
            <p>Push</p>
            <p>Email</p>
          </div>
        </div>
        <div className="notification__preferences-body">
          <div>
            <p>Subscriptions</p>
            <small>Notify me about activity from the businesses I’m subscribed to</small>
          </div>
          <div className="subscriptions-detail">
            <BsCircle />
            <BsCheckCircleFill className='check'/>
          </div>

        </div>
        <div className="notification__preferences-body">
          <div>
            <p>Business settings</p>
            <small>To change notification preferences for each subscribed business.</small>
          </div>
          <div className="subscriptions-detail">
            <BsCheckCircleFill className='check'/>
            <BsCircle />
          </div>

        </div>
        <div className="notification__preferences-body">
          <div>
            <p>Replies to my comments</p>
            <small>Notify me about replies to my comments</small>
          </div>
          <div className="subscriptions-detail">
            <BsCheckCircleFill className='check'/>
            <BsCircle />
          </div>

        </div>
      </div>
    </>
  );
};

export default AccountSetting;