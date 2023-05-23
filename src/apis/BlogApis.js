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

export const writeBlog = async ({  title, detail, image, tag }) => {
  console.log('called write blog api');

  // Retrieve the auth_code from local storage
  const auth_code = localStorage.getItem('auth_code');
  console.log('auth_code', auth_code);

  const response = await axios.post(`${API.host}/blog/add/`, {
    title,
    detail,
    image,
    tag,
    auth_code,
  });

  console.log(response.data);
  return response.data;
};
