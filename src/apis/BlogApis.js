import {API} from './main';
import axios, {AxiosResponse} from 'axios';

export const getBlogs = async ({pageParam = 0}) => {
  let step = 10;
  let start = pageParam * step;
  let end = start + step;
  const response = await axios.get(`${API.host}/blog/${start}/${end}/`);
  return response.data;
};

export const getBlogById = async (id) => {
  const response = await axios.get(`${API.host}/blog/get/${id}/`);
  return response.data;
};
