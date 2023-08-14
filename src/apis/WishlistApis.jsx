import axios from "axios";
import { API } from "./main";

export const getWishlist = async () => {
  console.log("called get wishlist api");

  // Retrieve the auth_code from local storage
  const auth_code = localStorage.getItem("auth_code");
  console.log("auth_code", auth_code);

  const response = await axios.get(
    `${API.host}/wishlist/all/product/${auth_code}/`
  );
  return response.data;
};

export const getBlogWishlist = async () => {
  console.log("called get blog wishlist api");

  // Retrieve the auth_code from local storage
  const auth_code = localStorage.getItem("auth_code");
  console.log("auth_code", auth_code);

  const response = await axios.get(
    `${API.host}/wishlist/all/blog/${auth_code}/`
  );
  return response.data;
};

export const AddProductWishlist = async ({ product_id }) => {
  console.log("called add product wishlist api");
  const auth_code = localStorage.getItem("auth_code");
  console.log("auth_code", auth_code);
  const response = await axios.post(`${API.host}/wishlist/add/product/`, {
    product_id,
    auth_code, // Include the auth_code in the request payload
  });
  console.log(response.data);
  return response.data;
};

export const AddAdsWishlist = async ({ ads_id }) => {
  console.log("called add ads wishlist api");
  const auth_code = localStorage.getItem("auth_code");
  console.log("auth_code", auth_code);
  const response = await axios.post(`${API.host}/wishlist/add/ads/`, {
    ads_id,
    auth_code, // Include the auth_code in the request payload
  });
  console.log(response.data);
  return response.data;
};

export const AddBlogWishlist = async ({ blog_id }) => {
  console.log("called add blog wishlist api");
  const auth_code = localStorage.getItem("auth_code");
  console.log("auth_code", auth_code);
  const response = await axios.post(`${API.host}/wishlist/add/blog/`, {
    blog_id,
    auth_code, // Include the auth_code in the request payload
  });
  console.log(response.data);
  return response.data;
};

export const DeleteWishlist = async ({ product_id }) => {
  console.log("called delete wishlist api");
  const auth_code = localStorage.getItem("auth_code");
  console.log("auth_code", auth_code);
  const response = await axios.post(`${API.host}/wishlist/delete/product/`, {
    product_id,
    auth_code, // Include the auth_code in the request payload
  });
  console.log(response.data);
  return response.data;
};

export const DeleteBlogWishlist = async ({ blog_id }) => {
  console.log("called delete wishlist api");
  const auth_code = localStorage.getItem("auth_code");
  console.log("auth_code", auth_code);
  const response = await axios.post(`${API.host}/wishlist/delete/blog/`, {
    blog_id,
    auth_code, // Include the auth_code in the request payload
  });
  console.log(response.data);
  return response.data;
};
