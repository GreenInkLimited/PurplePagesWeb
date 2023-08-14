import React, { useEffect, useState } from "react";
import { BsCircle, BsCheckCircleFill } from "react-icons/bs";
import {
  AiOutlineEdit,
  AiOutlineEyeInvisible,
  AiOutlineEye,
} from "react-icons/ai";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getUser, UpdateProfile } from "../../apis";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { RiLockLine, RiImageAddLine } from "react-icons/ri";
import ChangePassword from "../Modals/ChangePassword";

const AccountSetting = () => {
  const [image, setImage] = useState(null);
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [fileName, setFileName] = useState("No File Selected");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [previewURL, setPreviewURL] = useState(null);

  const [subscriptionsEnabled, setSubscriptionsEnabled] = useState(true);
  const [businessSettingsEnabled, setBusinessSettingsEnabled] = useState(false);
  const [repliesToCommentsEnabled, setRepliesToCommentsEnabled] =
    useState(true);
  const [repliesToCommentsEnabledPush, setRepliesToCommentsEnabledPush] =
    useState(false);

  const [pushNotificationEnabled, setPushNotificationEnabled] = useState(true);
  const [emailNotificationEnabled, setEmailNotificationEnabled] =
    useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handlePushNotificationChange = () => {
    setPushNotificationEnabled(!pushNotificationEnabled);
  };

  const handleEmailNotificationChange = () => {
    setEmailNotificationEnabled(!emailNotificationEnabled);
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setImage(file);
      const previewURL = URL.createObjectURL(file);
      setPreviewURL(previewURL);
    }
  };

  const validationSchema = Yup.object({
    last_name: Yup.string().required("Field is required"),
    first_name: Yup.string().required("Field is required"),
    phone: Yup.string().required("Field number is required"),
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser({ pageParam: 0 });
        setUser(response);
      } catch (error) {
        console.log("Error fetching User:", error);
      }
    };
    fetchUser();
  }, []);

  const { isLoading, error, isError, mutateAsync, data } = useMutation(
    "accountsetting",
    UpdateProfile,
    {
      onSuccess: (data) => {
        console.log(data);
        navigate("/personal");
        window.location.reload();
      },
    }
  );

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedUser(user);
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
      <div className="account__settings-header">
        <h4>Profile</h4>

        {isEditing ? (
          <div>
            <button
              className="account__settings-save cancel"
              onClick={handleCancelClick}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div>
            <button
              className="account__settings-edit"
              onClick={handleEditClick}
            >
              {" "}
              Edit <AiOutlineEdit />
            </button>
          </div>
        )}
      </div>
      <div className="account__settings-content">
        <div className="account__settings-left">
          {isEditing ? (
            <div className="should__not-show__mobile">
              <p>Username</p>
              <p>First Name</p>
              <p>Last Name</p>
              <p>Email</p>
              <p>Phone Number</p>
            </div>
          ) : (
            <>
              <p>Username</p>
              <p>First Name</p>
              <p>Last Name</p>
              <p>Email</p>
              <p>Phone Number</p>
              <p>Password</p>
            </>
          )}
        </div>
        <Formik
          initialValues={{
            first_name: user ? user.first_name || "" : "",
            last_name: user ? user.last_name || "" : "",
            phone: user ? user.phone || "" : "",
            image: null,
          }}
          onSubmit={async (values) => {
            await mutateAsync({
              first_name: values.first_name,
              last_name: values.last_name,
              phone: values.phone,
              image: image,
            });
            console.log(values);
          }}
          validationSchema={validationSchema}
        >
          {({ isSubmitting }) => (
            <Form>
              {user && (
                <div className="account__settings-right">
                  <div className="">
                    <div
                      onClick={() =>
                        document.querySelector(".logo-input").click()
                      }
                    >
                      <Field
                        className="input-field logo-input"
                        type="file"
                        accept="image/jpeg, image/png"
                        name="image"
                        hidden
                        onChange={handleLogoUpload}
                      />
                      {previewURL ? (
                        <img
                          src={previewURL}
                          alt={fileName}
                          className="uploaded-image-profile"
                        />
                      ) : (
                        <img
                          src={user.image}
                          alt={fileName}
                          className="uploaded-image-profile"
                        />
                      )}
                      {isEditing && (
                        <div className="camera-icon-container">
                          <RiImageAddLine className="camera-icon" />
                        </div>
                      )}
                    </div>
                    <p>
                      {isEditing ? (
                        <>
                          <label htmlFor="username">Username</label>
                          <div className="input__divx">
                            <input
                              className="inputingxyz"
                              type="text"
                              name="username"
                              value={editedUser.username}
                              onChange={handleInputChange}
                              readOnly
                            />
                            <button
                              type="button"
                              className="password-toggle-button"
                            >
                              <RiLockLine />
                            </button>
                          </div>
                        </>
                      ) : (
                        user.username
                      )}
                    </p>
                    <p>
                      {isEditing ? (
                        <>
                          <label htmlFor="username">First Name</label>
                          <Field
                            className="inputing"
                            type="text"
                            name="first_name"
                            placeholder={editedUser.first_name}
                            required="true"
                          />
                        </>
                      ) : (
                        user.first_name || "first name"
                      )}
                      <ErrorMessage
                        name="first_name"
                        component="small"
                        className="error-message"
                      />
                    </p>
                    <p>
                      {isEditing ? (
                        <>
                          <label htmlFor="username">Last Name</label>
                          <Field
                            className="inputing"
                            type="text"
                            name="last_name"
                            placeholder={editedUser.last_name}
                            required="true"
                          />
                        </>
                      ) : (
                        user.last_name || "last name"
                      )}
                      <ErrorMessage
                        name="last_name"
                        component="small"
                        className="error-message"
                      />
                    </p>
                    <p>
                      {isEditing ? (
                        <>
                          <label htmlFor="username">Email</label>
                          <div className="input__divx">
                            <input
                              className="inputingxyz"
                              type="email"
                              name="email"
                              value={editedUser.email}
                              onChange={handleInputChange}
                              readOnly
                            />
                            <button
                              type="button"
                              className="password-toggle-button"
                            >
                              <RiLockLine />
                            </button>
                          </div>
                        </>
                      ) : (
                        user.email
                      )}
                    </p>
                    <p>
                      {isEditing ? (
                        <>
                          <label htmlFor="username">Phone Number</label>
                          <Field
                            className="inputing"
                            type="tel"
                            name="phone"
                            placeholder={editedUser.phone}
                            required="true"
                          />
                        </>
                      ) : (
                        user.phone
                      )}
                    </p>
                    <p>
                      {isEditing ? (
                        <></>
                      ) : (
                        <p
                          className="password__setmodal_button"
                          onClick={() => setOpenModal(true)}
                        >
                          *******
                        </p>
                      )}
                    </p>
                  </div>
                </div>
              )}

              {isEditing && (
                <button
                  className="save_profile-button"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Save
                </button>
              )}
            </Form>
          )}
        </Formik>
      </div>

      <div className="notifications">
        <div className="notification__mobile">
          <h4>Notification Preferences</h4>
        </div>
        <div className="notification__preferences">
          <h4>Notification Preferences</h4>
          <div className="pust__email-notification">
            <p>Push</p>
            <p>Emails</p>
          </div>
        </div>
        <div className="notification__preferences-body">
          <div>
            <p>Subscriptions</p>
            <small>
              Notify me about activity from the businesses I’m subscribed to
            </small>
          </div>
          <div className="subscriptions-detail">
            {pushNotificationEnabled ? (
              <BsCheckCircleFill
                className="check"
                onClick={handlePushNotificationChange}
              />
            ) : (
              <BsCircle onClick={handlePushNotificationChange} />
            )}
            {emailNotificationEnabled ? (
              <BsCheckCircleFill
                className="check"
                onClick={handleEmailNotificationChange}
              />
            ) : (
              <BsCircle onClick={handleEmailNotificationChange} />
            )}
          </div>
        </div>

        <div className="notification__preferences-body">
          <div>
            <p>Business settings</p>
            <small>
              To change notification preferences for each subscribed business.
            </small>
          </div>
          <div className="subscriptions-detail">
            {businessSettingsEnabled ? (
              <BsCheckCircleFill
                className="check"
                onClick={() =>
                  setBusinessSettingsEnabled(!businessSettingsEnabled)
                }
              />
            ) : (
              <BsCircle
                onClick={() =>
                  setBusinessSettingsEnabled(!businessSettingsEnabled)
                }
              />
            )}
            {subscriptionsEnabled ? (
              <BsCheckCircleFill
                className="check"
                onClick={() => setSubscriptionsEnabled(!subscriptionsEnabled)}
              />
            ) : (
              <BsCircle
                onClick={() => setSubscriptionsEnabled(!subscriptionsEnabled)}
              />
            )}
          </div>
        </div>

        <div className="notification__preferences-body">
          <div>
            <p>Replies to my comments</p>
            <small>Notify me about replies to my comments</small>
          </div>
          <div className="subscriptions-detail">
            {repliesToCommentsEnabled ? (
              <BsCheckCircleFill
                className="check"
                onClick={() =>
                  setRepliesToCommentsEnabled(!repliesToCommentsEnabled)
                }
              />
            ) : (
              <BsCircle
                onClick={() =>
                  setRepliesToCommentsEnabled(!repliesToCommentsEnabled)
                }
              />
            )}
            {repliesToCommentsEnabledPush ? (
              <BsCheckCircleFill
                className="check"
                onClick={() =>
                  setRepliesToCommentsEnabledPush(!repliesToCommentsEnabledPush)
                }
              />
            ) : (
              <BsCircle
                onClick={() =>
                  setRepliesToCommentsEnabledPush(!repliesToCommentsEnabledPush)
                }
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountSetting;
