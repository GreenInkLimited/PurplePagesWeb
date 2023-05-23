import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Logo from '../../assets/pplogo.png';
import Google from '../../assets/Google.png';
import FacebookLogin from '../../assets/FacebookLogin.png';
import Line from '../../assets/Line.png';
import { IoIosCheckboxOutline } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { submitSignUp } from '../../apis';
import { useMutation } from 'react-query';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'

const Signup = () => {
  const navigate = useNavigate();
  const { isLoading, error, isError, mutateAsync, data } = useMutation(
    'signup',
    submitSignUp,
    {
      onSuccess: (data) => {
        console.log(data);
        localStorage.setItem('auth_code', data.auth_code);
        // Redirect to the verification page after successful form submission
        navigate(`/verify?email=${data.email}&phone=${data.phone}`);
      },
    }
  );

  

  const initialValues = {
    username: '',
    email: '',
    phone: '',
    password: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(
        /[!@#$%^&*]/,
        'Password must contain at least one special character (!@#$%^&*)'
      ),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await mutateAsync({
        email: values.email,
        password: values.password,
        phone: values.phone,
        username: values.username,
      });

      // Handle any errors if needed

      // Redirect to the verification page if signup is successful
      if (response) {
        navigate(`/verify?email=${values.email}&phone=${values.phone}`);
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

  return (
    <div className="container signup_wrapper">
      <div className="signup__content">
        <img src={Logo} alt="logo" />
        <div className="signup__body">
          <h1>Create an account</h1>
          <div className="signup_paragraph">
            <p>Already have an account?</p>
            <Link to="/signin/">
              <span>Sign in</span>
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
            onSubmit={handleSubmit}
          >
            <Form>
              <label htmlFor="username">Name</label>
              <Field
                className="input"
                type="text"
                name="username"
                placeholder="Preferably your social media one"
              />
              <ErrorMessage name="username" component="small" className="error-message" />

              <label htmlFor="email">Email</label>
              <Field
                className="input"
                type="email"
                name="email"
                placeholder="Preferably your social media one"
              />
              <ErrorMessage name="email" component="small" className="error-message" />

              <label htmlFor="phone">Phone Number</label>
              <Field
                className="input"
                type="tel"
                name="phone"
                placeholder="Preferably your social media one"
              />
              <ErrorMessage name="phone" component="small" className="error-message" />

              <label htmlFor="password">Password</label>
              <div className='input__div'>
                <Field
  className="inputxyz"
  type={showPassword ? 'text' : 'password'}
  name="password"
  placeholder="********"
  
/>
<button
  type="button"
  className="password-toggle-button"
  onClick={togglePasswordVisibility}
>{showPassword ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>}
</button>
  </div>            
              <ErrorMessage name="password" component="small" className="error-message" />

              <div className="agree__to__terms">
                <IoIosCheckboxOutline />
                <p>I agree to purple pages </p>
                <Link to="/terms/">
                  <span>Terms & Conditions</span>
                </Link>
              </div>
              <button className="input" type="submit">
                Proceed
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Signup;