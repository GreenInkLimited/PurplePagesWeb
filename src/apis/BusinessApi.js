import { API } from "./main";
import axios, { AxiosResponse } from "axios";

export const getBusiness = async ({ pageParam = 0 }) => {
  let step = 16;
  let start = pageParam * step;
  let end = start + step;
  const response = await axios.get(`${API.host}/business/all/${start}/${end}/`);
  return response.data;
};

export const getMyBusiness = async ({ pageParam = 0 }) => {
  console.log("called get my business api");
  let step = 5;
  let start = pageParam * step;
  let end = start + step;
  const auth_code = localStorage.getItem("auth_code");
  const response = await axios.get(
    `${API.host}/business/all-my-business/${auth_code}/${start}/${end}/`
  );
  return response.data;
};

export const AddBusiness = async ({
  name,
  business_type,
  rc_number,
  category,
  location,
  lga,
  description,
  phone,
  email,
  website,
  address,
  marketplace,
  marketplace_link,
  image,
  banner,
}) => {
  console.log("called business api");
  const auth_code = localStorage.getItem("auth_code");
  console.log("auth_code", auth_code);

  const formData = new FormData();
  formData.append("image", image);
  formData.append("banner", banner);
  formData.append("name", name);
  formData.append("business_type", business_type);
  formData.append("rc_number", rc_number);
  formData.append("category", category);
  formData.append("location", location);
  formData.append("lga", lga);
  formData.append("description", description);
  formData.append("phone", phone);
  formData.append("email", email);
  formData.append("website", website);
  formData.append("address", address);
  formData.append("marketplace", marketplace);
  formData.append("marketplace_link", marketplace_link);
  formData.append("auth_code", auth_code);

  const response = await axios.post(`${API.host}/business/add/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getProduct = async ({ pageParam = 0 }) => {
  let step = 16;
  let start = pageParam * step;
  let end = start + step;
  const response = await axios.get(`${API.host}/product/${start}/${end}/`);
  return response.data;
};

export const getBusinessById = async ({ id, pageParam = 0 }) => {
  let step = 16;
  let start = pageParam * step;
  let end = start + step;
  const response = await axios.get(
    `${API.host}/business/get/${id}/${start}/${end}/`
  );
  return response.data;
};

export const getProductById = async (id) => {
  const response = await axios.get(`${API.host}/product/get/${id}/`);
  return response.data;
};

export const getAdmin = async (id) => {
  console.log("called add admin api");
  const response = await axios.get(`${API.host}/business/get-access2/${id}/`);
  return response.data;
};

export const RevokeAccess = async ({ business_id, username }) => {
  console.log("called delete admin api");
  console.log("AddNewProduct - id:", business_id);
  const auth_code = localStorage.getItem("auth_code");
  console.log("auth_code", auth_code);
  const response = await axios.post(`${API.host}/business/revoke-access/`, {
    business_id,
    auth_code, // Include the auth_code in the request payload
    username,
  });
  console.log(response.data);
  return response.data;
};

export const AddAdmin = async ({ username, business_id }) => {
  console.log("called add admin api");
  console.log("AddNewProduct - id:", business_id);

  const formData = new FormData();
  formData.append("username", username);
  formData.append("business_id", business_id);

  const auth_code = localStorage.getItem("auth_code");
  formData.append("auth_code", auth_code);

  try {
    const response = await axios.post(
      `${API.host}/business/share-access/`,
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

export const SubscribeToBusiness = async ({ business_id }) => {
  console.log("called add subscription api");
  const auth_code = localStorage.getItem("auth_code");
  console.log("auth_code", auth_code);
  const response = await axios.post(`${API.host}/business/subscribe/`, {
    business_id,
    auth_code, // Include the auth_code in the request payload
  });
  console.log(response.data);
  return response.data;
};

export const getSubcriptions = async ({ pageParam = 0 }) => {
  console.log("called get subscrptions api");
  let step = 50;
  let start = pageParam * step;
  let end = start + step;
  // Retrieve the auth_code from local storage
  const auth_code = localStorage.getItem("auth_code");
  console.log("auth_code", auth_code);

  const response = await axios.get(
    `${API.host}/business/subscriptions/${auth_code}/${start}/${end}/`
  );
  return response.data;
};

export const getMyBusinessById = async ({ id, pageParam = 0 }) => {
  console.log("called get my business api");
  let step = 16;
  let start = pageParam * step;
  let end = start + step;
  const auth_code = localStorage.getItem("auth_code");
  const response = await axios.get(
    `${API.host}/business/get-my-business/${auth_code}/${id}/${start}/${end}/`
  );
  return response.data;
};

export const AddNewProduct = async ({
  image,
  caption,
  price,
  discount,
  color,
  detail,
  business_id,
}) => {
  console.log("called add product api");
  console.log("AddNewProduct - image:", image);

  const formData = new FormData();
  formData.append("image", image);
  formData.append("caption", caption);
  formData.append("price", price);
  formData.append("discount", discount);
  formData.append("color", color);
  formData.append("detail", detail);
  formData.append("business_id", business_id);

  const auth_code = localStorage.getItem("auth_code");
  formData.append("auth_code", auth_code);

  try {
    const response = await axios.post(`${API.host}/product/add/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

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

export const WriteBlog = async ({
  title,
  detail,
  image,
  tags,
  business_id,
}) => {
  console.log("called write blog api");
  console.log("Write blog - image:", image);

  const formData = new FormData();
  formData.append("title", title);
  formData.append("detail", detail);
  formData.append("image", image);
  formData.append("tags", tags);
  formData.append("business_id", business_id);

  const auth_code = localStorage.getItem("auth_code");
  formData.append("auth_code", auth_code);

  try {
    const response = await axios.post(`${API.host}/blog/add/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(response);
    console.log(Object.keys(response));

    // Include the business_id in the returned object
    return {
      data: response.data,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Error uploading image");
  }
};

export const PromoteBusiness = async ({
  ads_type,
  price,
  plan,
  duration,
  location,
  business_id,
}) => {
  console.log("called promote business api");

  const formData = new FormData();
  formData.append("ads_type", ads_type);
  formData.append("price", price);
  formData.append("plan", plan);
  formData.append("duration", duration);
  formData.append("location", location);
  formData.append("business_id", business_id); // Include the business_id in the request payload

  const auth_code = localStorage.getItem("auth_code");
  formData.append("auth_code", auth_code);

  try {
    const response = await axios.post(
      `${API.host}/business/promote/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(response);
    console.log(Object.keys(response));

    // Include the business_id in the returned object
    return {
      data: response.data,
      business_id: business_id,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Error promoting business");
  }
};

export const PromoteBusinessPay = async ({ business_ads_id }) => {
  console.log("called promote business api");

  const formData = new FormData();
  formData.append("business_ads_id", business_ads_id); // Include the business_id in the request payload

  const auth_code = localStorage.getItem("auth_code");
  formData.append("auth_code", auth_code);

  try {
    const response = await axios.post(
      `${API.host}/business/promote/paid/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(response);
    console.log(Object.keys(response));

    // Include the business_id in the returned object
    return {
      data: response.data,
      business_ads_id: business_ads_id,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Error promoting business");
  }
};

export const ReviewBusiness = async ({
  detail,
  rating,
  image,
  business_id,
}) => {
  console.log("called promote business api");

  const formData = new FormData();
  formData.append("detail", detail);
  formData.append("rating", rating);
  formData.append("image", image);
  formData.append("business_id", business_id); // Include the business_id in the request payload

  const auth_code = localStorage.getItem("auth_code");
  formData.append("auth_code", auth_code);

  try {
    const response = await axios.post(`${API.host}/review/add/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(response);
    console.log(Object.keys(response));

    // Include the business_id in the returned object
    return {
      data: response.data,
      business_id: business_id,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Error promoting business");
  }
};

export const SendMail = async ({
  subject,
  mail,
  file,
  price,
  bundle,
  business_id,
}) => {
  console.log("called send mail api");
  console.log("subject:", subject);
  console.log("mail:", mail);
  console.log("file:", file);
  console.log("price:", price);
  console.log("bundle:", bundle);
  console.log("business_id:", business_id);

  const formData = new FormData();
  formData.append("subject", subject);
  formData.append("mail", mail);
  formData.append("file", file);
  formData.append("price", price);
  formData.append("bundle", bundle);
  formData.append("business_id", business_id); // Include the business_id in the request payload

  const auth_code = localStorage.getItem("auth_code");
  console.log("auth_code:", auth_code);
  formData.append("auth_code", auth_code);

  try {
    const response = await axios.post(`${API.host}/add/mail/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(response);
    console.log(Object.keys(response));

    // Include the business_id in the returned object
    return {
      data: response.data,
      business_id: business_id,
    };
  } catch (error) {
    console.error(error); // Log the entire error object
    throw new Error("Error sending mail");
  }
};

export const getMails = async ({ id }) => {
  console.log("called get my mails api");
  const response = await axios.get(`${API.host}/get/mail/${id}/`);
  return response.data;
};

export const UpdateMailSettings = async ({
  email_host,
  email_host_user,
  email_host_password,
  email_port,
  business_id,
}) => {
  console.log("called send mail api");
  console.log("email_host:", email_host);
  console.log("email_host_user:", email_host_user);
  console.log("email_host_password:", email_host_password);
  console.log("email_port:", email_port);
  console.log("business_id:", business_id);

  const formData = new FormData();
  formData.append("email_host", email_host);
  formData.append("email_host_user", email_host_user);
  formData.append("email_host_password", email_host_password);
  formData.append("email_port", email_port);
  formData.append("business_id", business_id); // Include the business_id in the request payload

  const auth_code = localStorage.getItem("auth_code");
  console.log("auth_code:", auth_code);
  formData.append("auth_code", auth_code);

  try {
    const response = await axios.post(
      `${API.host}/business/update/mail-setting/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(response);
    console.log(Object.keys(response));

    // Include the business_id in the returned object
    return {
      data: response.data,
      business_id: business_id,
    };
  } catch (error) {
    console.error(error); // Log the entire error object
    throw new Error("Error sending mail");
  }
};

export const getBusinessCount = async () => {
  const response = await axios.get(`${API.host}/business/business-count/`);
  return response.data;
};

export const getUserCount = async () => {
  const response = await axios.get(`${API.host}/app/user-count/`);
  return response.data;
};
