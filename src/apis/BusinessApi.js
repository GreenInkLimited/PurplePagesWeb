import {API} from './main';
import axios, {AxiosResponse} from 'axios';

export const getBusiness = async ({pageParam = 0}) => {
  let step = 16;
  let start = pageParam * step;
  let end = start + step;
  const response = await axios.get(`${API.host}/business/all/${start}/${end}/`);
  return response.data;
};

export const getMyBusiness = async ({pageParam = 0}) => {
  console.log('called get my business api');
  let step = 5;
  let start = pageParam * step;
  let end = start + step;
  const auth_code = localStorage.getItem('auth_code');
  const response = await axios.get(`${API.host}/business/all-my-business/${auth_code}/${start}/${end}/`);
  return response.data;
};

export const AddBusiness = async ({name, business_type, rc_number, category, location, lga, description, phone, email, website, address, marketplace, marketplace_link, image}) => {
  console.log('called business api');
  const auth_code = localStorage.getItem('auth_code');
  console.log('auth_code', auth_code);
  const response = await axios.post(`${API.host}/business/add/`, {
    image,
    name,
    business_type,
    rc_number,
    category,
    location,
    lga,
    description,
    phone,
    email,
    website,
    address,
    marketplace,
    marketplace_link,
    auth_code,
  });
  // console.log(response);
  // console.log(Object.keys(response));
  return response.data;
};

export const getProduct = async ({pageParam = 0}) => {
  let step = 16;
  let start = pageParam * step;
  let end = start + step;
  const response = await axios.get(`${API.host}/product/${start}/${end}/`);
  return response.data;
};


export const getBusinessById = async ({id, pageParam = 0}) => {
  let step = 16;
  let start = pageParam * step;
  let end = start + step;
  const response = await axios.get(`${API.host}/business/get/${id}/${start}/${end}/`);
  return response.data;
};

export const getProductById = async (id) => {
  const response = await axios.get(`${API.host}/product/get/${id}/`);
  return response.data;
};

