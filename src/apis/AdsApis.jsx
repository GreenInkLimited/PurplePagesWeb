import axios from "axios";
import { API } from "./main";


export const getAllAds = async ({pageParam = 0}) => {
  let step = 16;
  let start = pageParam * step;
  let end = start + step;
  const response = await axios.get(`${API.host}/get/all-adverts/${start}/${end}/`);
  return response.data;
};