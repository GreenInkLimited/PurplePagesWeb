import React, { useRef, useState } from "react";
import Logo from "../../assets/pplogo.png";
import { MdArrowBack } from "react-icons/md";
import { CreateEventAccount } from "../../apis/EventsApis";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const CorporateAccount = ({ goBack }) => {
  const navigate = useNavigate();

  const { isLoading, error, isError, mutateAsync, data } = useMutation(
    "create event",
    CreateEventAccount,
    {
      onSuccess: (data) => {
        console.log(data);
        localStorage.setItem("auth_code", data.auth_code);
        // Redirect to the verification page after successful form submission
        navigate(`/verification`);
      },
    }
  );

  const handleGoBackClick = () => {
    goBack();
  };

  const initialValues = {
    full_name: "",
    username: "",
    email: "",
    bank_name: "",
    account_type: "corporate",
    account_name: "",
    account_number: "",
    password: "",
  };

  const handleSubmit = async (values) => {
    try {
      const response = await mutateAsync({
        full_name: values.full_name,
        username: values.username,
        email: values.email,
        bank_name: values.bank_name,
        account_type: values.account_type,
        account_name: values.account_name,
        account_number: values.account_number,
        password: values.password,
      });

      // Handle any errors if needed

      // Redirect to the verification page if signup is successful
      if (response) {
        navigate(`/verification`);
      }
    } catch (error) {
      // Handle error during form submission
      console.log(error);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const validationSchema = Yup.object({
    full_name: Yup.string().required("Full name is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    bank_name: Yup.string().required("Bank name  is required"),
    account_name: Yup.string().required("Account name  is required"),
    account_number: Yup.string().required("Account number  is required"),
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
  });

  return (
    <div className="personal__account__form-container">
      <div className="persornal__account__form-top">
        <Link to="/">
          <img src={Logo} alt="logo" />
        </Link>
        <div
          className="persornal__account__form-back"
          onClick={handleGoBackClick}
        >
          <MdArrowBack /> <p>back</p>
        </div>
      </div>
      <div className="persornal__account__form-wrapper">
        <Link to="/">
          <img
            src={Logo}
            alt="logo"
            className="personal__account__form-containerx-img"
          />
        </Link>
        <h2>Corporate Account</h2>
        <p className="persornal__account__form-paragraph">
          Please verify that all information submitted is accurate and matches
          your official identification documents.
        </p>

        <div className="persornal__account__main-form">
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <Form>
              <label>
                Company/Brand Name <small>(required)</small>
              </label>
              <Field
                className="personal__input"
                type="text"
                name="full_name"
                placeholder="Placeholder text"
              />
              <ErrorMessage
                name="full_name"
                component="small"
                className="error-message"
              />
              <label>
                Username{" "}
                <small>(will be displayed on your event banners)</small>
              </label>
              <Field
                className="personal__input"
                type="text"
                name="username"
                placeholder="Placeholder text"
              />
              <ErrorMessage
                name="username"
                component="small"
                className="error-message"
              />
              <label>
                Email <small>(required)</small>
              </label>
              <Field
                className="personal__input"
                type="email"
                name="email"
                placeholder="Placeholder text"
              />
              <ErrorMessage
                name="email"
                component="small"
                className="error-message"
              />
              <label>
                Bank Name <small>(required)</small>
              </label>
              <Field
                className="personal__input"
                type="text"
                name="bank_name"
                placeholder="Placeholder text"
              />
              <ErrorMessage
                name="bank_name"
                component="small"
                className="error-message"
              />
              <label>
                Account Name <small>(Savings)</small>
              </label>
              <Field
                className="personal__input"
                type="text"
                name="account_name"
                placeholder="Placeholder text"
              />
              <ErrorMessage
                name="account_name"
                component="small"
                className="error-message"
              />
              <label>
                Account Number <small>(Savings)</small>
              </label>
              <Field
                className="personal__input"
                type="text"
                name="account_number"
                placeholder="Placeholder text"
              />
              <ErrorMessage
                name="account_number"
                component="small"
                className="error-message"
              />
              <small>Payments will be sent for tickets sold</small>
              <label>Password</label>
              <div className="input__div">
                <Field
                  className="inputxyz"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="********"
                />

                <button
                  type="button"
                  className="password-toggle-button"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
              </div>
              <ErrorMessage
                name="password"
                component="small"
                className="error-message"
              />

              <button className="personal__input button" type="submit">
                Create account
              </button>
              <div
                className="persornal__account__fotter-back"
                onClick={handleGoBackClick}
              >
                <MdArrowBack />
                <p>go back</p>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CorporateAccount;
