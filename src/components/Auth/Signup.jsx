import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Logo from "../../assets/pplogo.png";
import FacebookLogin from "../../assets/FacebookLogin.png";
import Line from "../../assets/Line.png";
import { IoIosCheckboxOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { SignUpWithGoogle, submitSignUp } from "../../apis";
import { useMutation } from "react-query";
import { BiError } from "react-icons/bi";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { GoogleLogin } from "react-google-login";

const Signup = () => {
  const [verificationError, setVerificationError] = useState("");
  const navigate = useNavigate();
  const { isLoading, error, isError, mutateAsync, data } = useMutation(
    "signup",
    submitSignUp,
    {
      onSuccess: (data, values) => {
        if (data && data.status_lean) {
          console.log(data);
          localStorage.setItem("auth_code", data.auth_code);
          // Redirect to the verification page after successful form submission
          navigate("/verify", {
            state: { email: values.email, phone: values.phone },
          });
        } else {
          // Verification unsuccessful
          setVerificationError("Username/Email Already Exist.");
          // You can perform any additional actions here, such as showing an error message
        }
      },
    }
  );

  const initialValues = {
    username: "",
    email: "",
    phone: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
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

  const googleClientId =
    "901500469662-1c1vhjf4sqtentao8up1joi4bj4sn6qk.apps.googleusercontent.com";

  const handleGoogleLoginSuccess = async (res) => {
    // Handle the Google login success here
    // You can access user information in res.profileObj (e.g., res.profileObj.email, res.profileObj.name, etc.)
    try {
      // Call the SignUpWithGoogle mutation here
      const response = await SignUpWithGoogle({
        email: res.profileObj.email,
        password: "", // Since this field is not available in the Google login response, you can set it to an empty string or omit it altogether.
        phone: "", // Similarly, you can set phone to an empty string or omit it if it's not provided by the Google login.
        first_name: res.profileObj.givenName, // Use the user's name from the Google login as the username.
        last_name: res.profileObj.familyName,
        image: res.profileObj.imageUrl,
        username: res.profileObj.name,
      });

      // The response object from SignUpWithGoogle will contain the data returned by the server
      if (response && response.status_lean) {
        localStorage.setItem("auth_code", response.auth_code);
        // Redirect to the app home after successful form submission
        navigate("/appads");
      } else {
        // Verification unsuccessful
        setVerificationError("Username/Email Already Exists.");
        // You can perform any additional actions here, such as showing an error message
      }
    } catch (error) {
      console.error("Error submitting user details to the database:", error);
      // Handle error here, such as showing an error message
    }
  };

  const handleGoogleLoginFailure = (error) => {
    console.error("Google login failed:", error);
    // Handle login failure here, such as showing an error message
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const googleLoginButtonContainerStyles = {
    backgroundColor: "transparent",
    borderRadius: 0,
    border: "none",
    boxShadow: "transparent",
    display: "inline-block",
    overflow: "hidden",
    marginTop: "-7px",
    background: "inherit",
  };

  const googleLoginButtonChildStyles = {
    background: "red",
  };
  return (
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
          <h1>Create an account</h1>
          <div className="signup_paragraph">
            <p>Already have an account?</p>
            <Link to="/signin/">
              <span>Sign in</span>
            </Link>
          </div>
          <div className="signup__with__alt">
            <div style={googleLoginButtonContainerStyles}>
              <GoogleLogin
                clientId={googleClientId}
                buttonText=""
                onSuccess={handleGoogleLoginSuccess}
                onFailure={handleGoogleLoginFailure}
                cookiePolicy={"single_host_origin"}
                style={googleLoginButtonChildStyles}
              />
            </div>
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
                email: values.email,
                password: values.password,
                phone: values.phone,
                username: values.username,
              });
              validationSchema = { validationSchema };
              console.log(values);
            }}
          >
            <Form>
              <label htmlFor="username">Username</label>
              <Field
                className="input"
                type="text"
                name="username"
                placeholder="purplepages"
              />
              <ErrorMessage
                name="username"
                component="small"
                className="error-message"
              />

              <label htmlFor="email">Email</label>
              <Field
                className="input"
                type="email"
                name="email"
                placeholder="purplepage@gmail.com"
              />
              <ErrorMessage
                name="email"
                component="small"
                className="error-message"
              />

              <label htmlFor="phone">Phone Number</label>
              <Field
                className="input"
                type="tel"
                name="phone"
                placeholder="+234 111 222 4444"
              />
              <ErrorMessage
                name="phone"
                component="small"
                className="error-message"
              />

              <label htmlFor="password">Password</label>
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

              <div className="agree__to__terms">
                <IoIosCheckboxOutline />
                <p>I agree to purple pages </p>
                <Link to="/terms/">
                  <span>Terms & Conditions</span>
                </Link>
              </div>
              <button className="input" type="submit">
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Signup;
