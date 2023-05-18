import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/pplogo.png';
import Google from '../../assets/Google.png';
import FacebookLogin from '../../assets/FacebookLogin.png';
import Line from '../../assets/Line.png';
import { IoIosCheckboxOutline } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { submitSignUp } from '../../apis';
import { useMutation } from 'react-query';



const Signup = () => {
  const navigate = useNavigate();
  const { isLoading, error, isError, mutateAsync, data } = useMutation(
    'signup',
    submitSignUp,
    {
      onSuccess: (data) => {
        console.log(data);
        // Redirect to home page after successful form submission
        navigate('/verify');
      },
    }
  );




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
            initialValues={{
              username: '',
              email: '',
              phone: '',
              password: '',
            }}
            onSubmit={async (values)=> {
          await mutateAsync({
            email:values.email, 
            password:values.password,
            phone:values.phone,
            username:values.username,
          });
          console.log(values);
          }}
          >
            <Form>
              <label>Name</label>
              <Field
                className="input"
                type="text"
                name="username"
                placeholder="Preferably your social media one"
              />
              <label>Email</label>
              <Field
                className="input"
                type="email"
                name="email"
                placeholder="Preferably your social media one"
              />
              <label>Phone Number</label>
              <Field
                className="input"
                type="tel"
                name="phone"
                placeholder="Preferably your social media one"
              />
              <label>Password</label>
              <Field
                className="input"
                type="password"
                name="password"
                placeholder="********"
              />
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