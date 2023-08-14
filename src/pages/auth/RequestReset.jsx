import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/pplogo.png";
import "./auth.css";
import Footer from "../../components/Footer";
import { requestResetPassword } from "../../apis";
import { Formik, Form, Field } from "formik";
import { useMutation } from "react-query";
import { BiError } from "react-icons/bi";
import { Link } from "react-router-dom";

const RequestReset = () => {
  const navigate = useNavigate();

  const form = useRef();
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationError, setVerificationError] = useState("");

  const { isLoading, error, isError, mutateAsync, data } = useMutation(
    "password reset",
    requestResetPassword,
    {
      onSuccess: (data) => {
        if (data && data.status_lean) {
          // Verification successful
          navigate("/reset-password");
        } else {
          // Verification unsuccessful
          setVerificationError("Invalid verification code. Please try again.");
          // You can perform any additional actions here, such as showing an error message
        }
      },
    }
  );

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
                <p>{verificationError}</p>
              </div>
            )}
            <h1>Forgot Password?</h1>
            <div className="signup_paragraph">
              <p>Enter the email associated with your purple pages account</p>
            </div>
            <Formik
              initialValues={{
                email: "",
              }}
              onSubmit={async (values) => {
                await mutateAsync({
                  email: values.email,
                });
              }}
            >
              <Form>
                <label>Email</label>
                <Field
                  className="input"
                  type="text"
                  name="email"
                  placeholder="Enter you email"
                />

                <button className="input" type="submit">
                  {isLoading ? "Verifying..." : "Proceed"}
                </button>
              </Form>
            </Formik>
            <div className="signup_paragraph">
              <p>Remember your password? </p>
              <Link to="/auth/">
                <span>Log In </span>
              </Link>{" "}
              <p> now</p>
            </div>
          </div>
        </div>
      </div>
      <div className="the__footer__signup">
        <Footer />
      </div>
    </>
  );
};

export default RequestReset;
