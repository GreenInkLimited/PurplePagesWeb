import {API} from './main';
import axios, {AxiosResponse} from 'axios';

export const getBusiness = async ({pageParam = 0}) => {
  let step = 16;
  let start = pageParam * step;
  let end = start + step;
  const response = await axios.get(`${API.host}/business/all/${start}/${end}/`);
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