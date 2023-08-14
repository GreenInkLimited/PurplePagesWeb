import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/pplogo.png";
import "./auth.css";
import Footer from "../../components/Footer";
import { otpVerification } from "../../apis";
import { Formik, Form, Field } from "formik";
import { useMutation } from "react-query";
import { BiError } from "react-icons/bi";
import { Link } from "react-router-dom";

const Verification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, phone } = location.state;

  const form = useRef();
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationError, setVerificationError] = useState("");

  const { isLoading, error, isError, mutateAsync, data } = useMutation(
    "verification",
    otpVerification,
    {
      onSuccess: (data) => {
        if (data && data.status_lean) {
          // Verification successful
          navigate("/interest");
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
            <h1>Verification</h1>
            <div className="signup_paragraph">
              <p>
                We sent a 6-digit code to <b>{phone}</b> and <b>{email}</b>
              </p>
            </div>
            <Formik
              initialValues={{
                otp_code: "",
              }}
              onSubmit={async (values) => {
                await mutateAsync({
                  otp_code: values.otp_code,
                });
              }}
            >
              <Form>
                <label>Verification code</label>
                <Field
                  className="input"
                  type="text"
                  name="otp_code"
                  placeholder="Enter verification code"
                />

                <button className="input" type="submit">
                  {isLoading ? "Verifying..." : "Proceed"}
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

export default Verification;
