import axios from "axios";
import { API } from "./main";


export const submitSignUp = async ({email, password, username, phone}) => {
  console.log('called signup api');
  const response = await axios.post(`${API.host}/app/sign-up/`, {
    username,
    password,
    email,
    phone,
  });
  // console.log(response);
  // console.log(Object.keys(response));
  return response.data;
};

export const loginUser = async ({username, password}) => {
  console.log('called login api');

  // Retrieve the auth_code from local storage
  

  let signInEndpoint = `${API.host}/app/sign-in/`;
  const response = await axios.post(signInEndpoint, {
    password,
    username,
  });
  console.log(signInEndpoint);
  // console.log(response);
  // console.log(Object.keys(response));
  return response.data;
};

export const otpVerification = async ({ otp_code }) => {
  console.log('called verify api');
  console.log('otp_code', otp_code);

  // Retrieve the auth_code from local storage
  const auth_code = localStorage.getItem('auth_code');
  console.log('auth_code', auth_code);

  const response = await axios.post(`${API.host}/app/verify/`, {
    otp_code,
    auth_code,
  });

  console.log(response.data);
  return response.data;
};

export const AddInterest = async ({ interest }) => {
  console.log('called verify api');
  console.log('interest', interest);

  // Retrieve the auth_code from local storage
  const auth_code = localStorage.getItem('auth_code');
  console.log('auth_code', auth_code);

  const response = await axios.post(`${API.host}/app/add-interest/`, {
    interest,
    auth_code,
  });

  console.log(response.data);
  return response.data;
};


export const ContactUsInput = async ({name, email, message}) => {
  console.log('called contact api');

  // Retrieve the auth_code from local storage
  //const auth_code = localStorage.getItem('auth_code');
  //console.log('auth_code', auth_code);

    let contactEndpoint = `${API.host}/add/message/`;
  const response = await axios.post(contactEndpoint, {
    name,
    email,
    message,
  });
  console.log(contactEndpoint);
  // console.log(response);
  // console.log(Object.keys(response));
  return response.data;
};


export const UpdateProfile = async ({first_name, last_name, phone}) => {
  console.log('called update profile api');
  const auth_code = localStorage.getItem('auth_code');
  console.log('auth_code', auth_code);
  const response = await axios.post(`${API.host}/app/edit-profile/`, {
    first_name,
    last_name,
    phone,
    auth_code,
  });
  // console.log(response);
  // console.log(Object.keys(response));
  return response.data;
};

export const MyChangePassword = async ({password, password1}) => {
  console.log('called update profile api');
  const auth_code = localStorage.getItem('auth_code');
  console.log('auth_code', auth_code);
  const response = await axios.post(`${API.host}/app/change-password/`, {
    password,
    password1,
    auth_code,
  });
  // console.log(response);
  // console.log(Object.keys(response));
  return response.data;
};


export const getUser = async () => {
  console.log('called get profile api');

  // Retrieve the auth_code from local storage
  const auth_code = localStorage.getItem('auth_code');
  console.log('auth_code', auth_code);

  const response = await axios.get(`${API.host}/app/get-profile/${auth_code}/`);
  return response.data;
};
