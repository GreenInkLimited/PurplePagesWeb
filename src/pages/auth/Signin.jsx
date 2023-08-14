import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/pplogo.png";
import Google from "../../assets/Google.png";
import FacebookLogin from "../../assets/FacebookLogin.png";
import Line from "../../assets/Line.png";
import { BiError } from "react-icons/bi";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import { loginUser } from "../../apis";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const Signin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [verificationError, setVerificationError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const { isLoading, isError, mutateAsync } = useMutation("signin", loginUser, {
    onSuccess: (data) => {
      if (data && data.status_lean) {
        navigate("/apphome");
        console.log(data);
        localStorage.setItem("auth_code", data.auth_code);
        // Redirect to home page after successful form submission
      } else {
        // Verification unsuccessful
        setVerificationError("Username/Email or Password not correct.");
      }
    },
  });

  const handleReset = () => {
    navigate("/request-reset");
  };

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

  const initialValues = {
    username: "",
    password: "",
  };

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
            <h1>Sign in</h1>
            <div className="signup_paragraph">
              <p>Don’t have an account?</p>
              <Link to="/auth/">
                <span>Create an account</span>
              </Link>
            </div>
            <div className="signup__with__alt">
              <img src={Google} alt="google" />
              <img src={FacebookLogin} alt="facebook" />
            </div>
            <div className="sigmup__with__alt__two">
              <img src={Line} alt="logo" />
              <p>OR</p>
              <img src={Line} alt="logo" />
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                await mutateAsync({
                  username: values.username,
                  password: values.password,
                });
                console.log(values);
              }}
            >
              <Form>
                <label>Email or Username</label>
                <Field
                  className="input"
                  type="text"
                  name="username"
                  placeholder="purplepage@gmail.com or purplepages"
                />
                <ErrorMessage
                  name="username"
                  component="small"
                  className="error-message"
                />
                <label>Password</label>
                <div className="input__div">
                  <Field
                    className="inputxyz"
                    type={showPassword ? "text" : "password"}
                    name="password"
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

                <p className="password-forgot" onClick={handleReset}>
                  Forgot Password?
                </p>
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

export default Signin;
