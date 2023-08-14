import { API } from "./main";
import axios, { AxiosResponse } from "axios";

export const getFaqs = async () => {
  const response = await axios.get(`${API.host}/app/faqs/`);
  return response.data;
};
