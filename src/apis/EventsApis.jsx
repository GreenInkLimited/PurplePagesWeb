import axios from "axios";
import { API } from "./main";

export const getAllEvents = async () => {
  console.log("called get events api");
  const response = await axios.get(`${API.host}/event/all-events/`);
  return response.data;
};

export const getEventById = async (id) => {
  const response = await axios.get(`${API.host}/event/event-detail/${id}/`);
  return response.data;
};

export const BuyTicket = async ({
  quantity,
  first_name,
  last_name,
  email,
  id,
}) => {
  console.log("called buy ticket  api");
  console.log("quantity:", quantity);
  console.log("first_name:", first_name);
  console.log("last_name:", last_name);
  console.log("email:", email);
  const response = await axios.post(`${API.host}/event/buy-ticket/${id}/`, {
    quantity,
    first_name,
    last_name,
    email,
  });
  console.log(response.data);
  return response.data;
};

export const CreateEventAccount = async ({
  full_name,
  username,
  email,
  bank_name,
  account_type,
  account_name,
  account_number,
  password,
}) => {
  console.log("called signup api");
  const response = await axios.post(`${API.host}/event/setup-account/`, {
    full_name,
    bank_name,
    account_type,
    account_name,
    account_number,
    username,
    password,
    email,
  });
  // console.log(response);
  // console.log(Object.keys(response));
  return response.data;
};

export const otpVerification = async ({ otp_code }) => {
  console.log("called verify api");
  console.log("otp_code", otp_code);

  // Retrieve the auth_code from local storage
  const auth_code = localStorage.getItem("auth_code");
  console.log("auth_code", auth_code);

  const response = await axios.post(`${API.host}/event/account/verify/`, {
    otp_code,
    auth_code,
  });

  console.log(response.data);
  return response.data;
};

export const AddEventDetails = async ({
  event_time,
  start_time,
  end_time,
  frequency,
  days,
  end_date,
  event_name,
  event_description,
  event_category,
  event_location,
  event_frequency,
  from_date,
  to_date,
  choose_dates,
  ticket_type,
  ticket_name,
  quantity,
  ticket_price,
  event_flier,
}) => {
  console.log("called add event api");
  console.log("event - image:", event_flier);

  const formData = new FormData();
  formData.append("event_name", event_name);
  formData.append("event_description", event_description);
  formData.append("event_category", event_category);
  formData.append("event_location", event_location);
  formData.append("event_frequency", event_frequency);
  formData.append("from_date", from_date);
  formData.append("to_date", to_date);
  formData.append("ticket_type", ticket_type);
  formData.append("ticket_name", ticket_name);
  formData.append("quantity", quantity);
  formData.append("ticket_price", ticket_price);
  formData.append("event_flier", event_flier);

  formData.append("event_time", event_time);
  formData.append("start_time", start_time);
  formData.append("end_time", end_time);
  formData.append("frequency", frequency);
  formData.append("days", days);
  formData.append("end_date", end_date);

  const auth_code = localStorage.getItem("auth_code");
  formData.append("auth_code", auth_code);

  try {
    const response = await axios.post(
      `${API.host}/event/post-event/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(response);
    console.log(Object.keys(response));

    return {
      data: response.data,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Error uploading image");
  }
};

export const SearchEvents = async (searchQuery) => {
  console.log("called search events API");
  const response = await axios.get(
    `${API.host}/event/search-event/?q=${searchQuery}`
  );
  return response.data;
};

export const getMyEvent = async () => {
  console.log("called get my events api");
  const auth_code = localStorage.getItem("auth_code");
  const response = await axios.get(`${API.host}/event/my-events/${auth_code}/`);
  return response.data;
};
