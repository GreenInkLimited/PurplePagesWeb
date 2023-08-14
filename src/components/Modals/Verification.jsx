import React, { useRef, useState } from "react";
import Logo from "../../assets/pplogo.png";
import { otpVerification } from "../../apis";
import { Formik, Form, Field } from "formik";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";

const Verification = () => {
  const form = useRef();
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationError, setVerificationError] = useState("");

  const navigate = useNavigate();
  const { isLoading, error, isError, mutateAsync, data } = useMutation(
    "verification",
    otpVerification,
    {
      onSuccess: (data) => {
        if (data && data.status_lean) {
          // Verification successful
          navigate("/stepper");
        } else {
          // Verification unsuccessful
          setVerificationError("Invalid verification code. Please try again.");
          // You can perform any additional actions here, such as showing an error message
        }
      },
    }
  );
  return (
    <div className="modal__background">
      <div className="personal__account__form-containerx">
        <Link to="/">
          <img src={Logo} alt="logo" />
        </Link>
        <div className="persornal__account__form-wrapper">
          <Link to="/">
            <img
              className="personal__account__form-containerx-img"
              src={Logo}
              alt="logo"
            />
          </Link>
          <h2>Verification</h2>
          <p className="persornal__account__form-paragraph">
            Please enter the code sent to your email below
          </p>

          <div className="persornal__account__main-form">
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
                <label>
                  Verification code <small>(required)</small>
                </label>
                <Field
                  className="personal__input"
                  type="text"
                  name="otp_code"
                  placeholder="Placeholder text"
                />
                {verificationError && (
                  <p className="error">{verificationError}</p>
                )}
                <button className="input" type="submit">
                  {isLoading ? "Verifying..." : "Proceed"}
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verification;
