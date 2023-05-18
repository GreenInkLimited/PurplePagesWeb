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

export const otpVerification = async ({
  auth,
  otp,
}) => {
  const data = {
    auth_code: auth,
    otp_code: otp,
  };
  const response = await axios.post(`${API.host}/app/verify/`, data);
  // const response = await fetch(API.host + '/app/verify/', {
  //   method: 'POST',
  //   body: data,
  // });
  console.log(response.data);

  return response.data;
};




