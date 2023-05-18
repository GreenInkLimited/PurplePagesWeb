import {API} from './main';
import axios, {AxiosResponse} from 'axios';

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