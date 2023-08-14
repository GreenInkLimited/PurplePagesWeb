import { API } from "./main";
import axios from "axios";

export const submitSignUp = async ({ email, password, username, phone }) => {
  console.log("called signup api");

  const response = await axios.post(`${API.host}/app/sign-up/`, {
    username,
    password,
    email,
    phone,
  });

  return response.data;
};
