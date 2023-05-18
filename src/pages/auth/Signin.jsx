import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/pplogo.png';
import Google from '../../assets/Google.png';
import FacebookLogin from '../../assets/FacebookLogin.png';
import Line from '../../assets/Line.png';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import { Formik, Form, Field } from 'formik';
import { useMutation } from 'react-query';
import { loginUser } from '../../apis';

const Signin = () => {
  const navigate = useNavigate();

  const { isLoading, error, isError, mutateAsync, data } = useMutation(
    'signin',
    loginUser,
    {
      onSuccess: (data) => {
        console.log(data);
        // Redirect to home page after successful form submission
        navigate('/apphome');
      },
    }
  );

  return (
    <>
    <div className="container signup_wrapper">
        <div className="signup__content">
            <img src={Logo} alt="logo" />
            <div className='signup__body'>
                <h1>Sign in</h1>
                <div className="signup_paragraph">
        <p>Don’t have an account?</p><Link to="/auth/"><span>Create an account</span></Link>
        </div>
        <div className="signup__with__alt">
            <img src={Google} alt="google" />
            <img src={FacebookLogin} alt="facebook" />
        </div>
        <div className='sigmup__with__alt__two'>
            <img src={Line} alt="logo"/>
            <p>OR</p>
            <img src={Line} alt="logo"/>
        </div>
      <Formik 
        initialValues={{username: "", password: ""}}
        onSubmit={async (values)=> {
          await mutateAsync({
            username:values.username, 
            password:values.password,
          });

          console.log(values);
        }}
      >
        <Form>
        
        <label>Email</label>
        <Field
          className="input"
          type="text"
          name="username"
          placeholder="Preferably your social media one"
        />
        <label>Password</label>
        <Field
          className="input"
          type="password"
          name="password"
          placeholder="*******"
        />
      <button className='input' type="submit" >Proceed</button>
        </Form>
      </Formik>
      
    </div>
        </div>
    </div>

    <div className='the__footer__signup'>
        <Footer />
        </div>
    </>
  )
}

export default Signin