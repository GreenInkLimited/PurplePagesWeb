import React, { useState } from "react";
import { MyChangePassword } from "../../apis";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ChangePassword = ({ closeModal }) => {
  const handleCancelClick = () => {
    closeModal(false); // Call the closeModal function to close the modal
  };
  const navigate = useNavigate();

  const { isLoading, error, isError, mutateAsync, data } = useMutation(
    "changepassword",
    MyChangePassword,
    {
      onSuccess: (data) => {
        console.log(data);
        //localStorage.setItem('auth_code', data.auth_code);
        // Redirect to home page after successful form submission
        navigate("/apphome");
      },
    }
  );

  const validationSchema = Yup.object({
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[!@#$%^&*]/,
        "Password must contain at least one special character (!@#$%^&*)"
      ),
    password1: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[!@#$%^&*]/,
        "Password must contain at least one special character (!@#$%^&*)"
      ),
  });

  return (
    <div className="change__password-container">
      <div className="change__password-wrapper">
        <p>Change Password</p>
        <hr />
        <div className="change__password-body">
          <Formik
            initialValues={{ password: "", password1: "" }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              await mutateAsync({
                password: values.password,
                password1: values.password1,
              });

              console.log(values);
            }}
          >
            <Form>
              <label>Old Password</label>
              <Field
                name="password"
                className="input"
                type="text"
                placeholder="placeholder text"
              />
              <ErrorMessage
                name="password"
                component="small"
                className="error-message"
              />
              <label>New Password</label>

              <Field
                name="password1"
                className="input"
                type="text"
                placeholder="placeholder text"
              />
              <ErrorMessage
                name="password1"
                component="small"
                className="error-message"
              />
              <div className="change__password-buttonx">
                <button className="cancel" onClick={handleCancelClick}>
                  Cancel
                </button>
                <button type="submit" className="change_password">
                  Change password
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
