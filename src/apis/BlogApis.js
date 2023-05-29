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

export const AddBlogComment = async ({ blog_id, comment }) => {
  console.log('called add blog comment api');
  const auth_code = localStorage.getItem('auth_code');
  console.log('auth_code', auth_code);
  const response = await axios.post(
    `${API.host}/blog/add-comment/`,
    {
      blog_id,
      comment,
      auth_code, // Include the auth_code in the request payload
    }
  );
  console.log(response.data);
  return response.data;
};

export const AddBlogLike = async ({ blog_id }) => {
  console.log('called add like api');
  const auth_code = localStorage.getItem('auth_code');
  console.log('auth_code', auth_code);
  const response = await axios.post(
    `${API.host}/blog/like/`,
    {
      blog_id,
      auth_code, // Include the auth_code in the request payload
    }
  );
  console.log(response.data);
  return response.data;
};

export const getBlogLikes = async (blog_id) => {
  console.log('called get likes api');
  const response = await axios.get(`${API.host}/blog/get-likes/${blog_id}/`);
  return response.data;
};
