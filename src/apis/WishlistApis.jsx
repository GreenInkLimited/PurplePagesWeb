import axios from "axios";
import { API } from "./main";


export const getWishlist = async () => {
  console.log('called get wishlist api');

  // Retrieve the auth_code from local storage
  const auth_code = localStorage.getItem('auth_code');
  console.log('auth_code', auth_code);

  const response = await axios.get(`${API.host}/wishlist/all/${auth_code}/`);
  return response.data;
};


