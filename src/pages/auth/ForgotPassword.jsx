import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/pplogo.png";
import { BiError } from "react-icons/bi";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import { resetPassword } from "../../apis";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [verificationError, setVerificationError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const { isLoading, error, isError, mutateAsync, data } = useMutation(
    "reset password",
    resetPassword,
    {
      onSuccess: (data) => {
        if (data && data.status_lean) {
          console.log(data);

          navigate("/apphome");
        } else {
          // Verification unsuccessful
          setVerificationError("Passwords do not match.");
          // You can perform any additional actions here, such as showing an error message
        }
      },
    }
  );

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
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
    <>
      <div className="container signup_wrapper">
        <div className="signup__content">
          <Link to="/">
            <img src={Logo} alt="logo" />
          </Link>

          <div className="signup__body">
            {verificationError && (
              <div className="error__background">
                <BiError />
                <p> {verificationError}</p>
              </div>
            )}
            <h1>Reset your Password?</h1>
            <div className="signup_paragraph">
              <p>
                Enter your 6-digit Verification Code sent to your email and
                enter your new password
              </p>
            </div>

            <Formik
              initialValues={{ otp_code: "", password1: "", password2: "" }}
              onSubmit={async (values) => {
                await mutateAsync({
                  otp_code: values.otp_code,
                  password1: values.password1,
                  password2: values.password2,
                });
                validationSchema = { validationSchema };
                console.log(values);
              }}
            >
              <Form>
                <label>Enter OTP</label>
                <Field
                  className="input"
                  type="text"
                  name="otp_code"
                  placeholder="000000"
                />

                <label>Password</label>
                <div className="input__div">
                  <Field
                    className="inputxyz"
                    type={showPassword ? "text" : "password"}
                    name="password1"
                    placeholder="*******"
                  />
                  <button
                    type="button"
                    className="password-toggle-button"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
                  </button>
                </div>

                <label>Confirm Password</label>
                <div className="input__div">
                  <Field
                    className="inputxyz"
                    type={showPassword ? "text" : "password"}
                    name="password2"
                    placeholder="*******"
                  />
                  <button
                    type="button"
                    className="password-toggle-button"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
                  </button>
                </div>

                <ErrorMessage
                  name="password"
                  component="small"
                  className="error-message"
                />
                <button className="input" type="submit">
                  {isLoading ? "Submitting..." : "Submit"}
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>

      <div className="the__footer__signup">
        <Footer />
      </div>
    </>
  );
};

export default ForgotPassword;
