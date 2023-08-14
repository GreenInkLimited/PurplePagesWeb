import axios from "axios";
import { API } from "./main";

export const getAllAds = async ({ pageParam = 0 }) => {
  let step = 16;
  let start = pageParam * step;
  let end = start + step;
  const response = await axios.get(
    `${API.host}/get/all-adverts/${start}/${end}/`
  );
  return response.data;
};

export const addCommentReply = async ({ comment_id, reply }) => {
  console.log("called add comment reply API");
  const auth_code = localStorage.getItem("auth_code");
  console.log("auth_code", auth_code);
  const response = await axios.post(
    `${API.host}/reply-comment/ads/${comment_id}/`,
    {
      reply,
      auth_code, // Include the auth_code in the request payload
    }
  );
  console.log(response.data);
  const commentId = response.data.id; // Assuming the comment ID is returned as "id" in the response
  return commentId;
};

export const getAdsById = async (id) => {
  const response = await axios.get(`${API.host}/get/ads-detail/${id}/`);
  return response.data;
};

export const AddAdsLike = async ({ ads_id }) => {
  console.log("called add like api");
  const auth_code = localStorage.getItem("auth_code");
  console.log("auth_code", auth_code);
  const response = await axios.post(`${API.host}/like/ads/`, {
    ads_id,
    auth_code, // Include the auth_code in the request payload
  });
  console.log(response.data);
  return response.data;
};

export const AddAdsComment = async ({ ads_id, comment }) => {
  console.log("called add ads comment api");
  const auth_code = localStorage.getItem("auth_code");
  console.log("auth_code", auth_code);
  const response = await axios.post(`${API.host}/add-comment/ads/`, {
    ads_id,
    comment,
    auth_code, // Include the auth_code in the request payload
  });
  console.log(response.data);
  return response.data;
};

export const AddAds = async ({
  price,
  title,
  location,
  duration,
  detail,
  f_status,
  i_status,
  t_status,
  business_id,
}) => {
  console.log("called add ads api");
  const auth_code = localStorage.getItem("auth_code");
  console.log("auth_code", auth_code);

  const formData = new FormData();

  formData.append("title", title);
  formData.append("price", price);
  formData.append("location", location);
  formData.append("duration", duration);
  formData.append("detail", detail);
  formData.append("f_status", f_status);
  formData.append("business_id", business_id);
  formData.append("i_status", i_status);
  formData.append("t_status", t_status);
  formData.append("auth_code", auth_code);

  const response = await axios.post(`${API.host}/add/ads/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const AddCategory = async ({ ads_id, category }) => {
  console.log("called add ads api");
  const auth_code = localStorage.getItem("auth_code");
  console.log("auth_code", auth_code);

  const formData = new FormData();
  formData.append("ads_id", ads_id);
  formData.append("category", category);
  formData.append("auth_code", auth_code);

  const response = await axios.post(`${API.host}/add-cat/ads/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const AdsImageUpload = async ({ ads_id, image, image_url }) => {
  console.log("called add ads image api");
  const auth_code = localStorage.getItem("auth_code");
  console.log("auth_code", auth_code);

  const formData = new FormData();
  formData.append("ads_id", ads_id);
  formData.append("image", image);
  formData.append("image_url", image_url);
  formData.append("auth_code", auth_code);

  const response = await axios.post(`${API.host}/add-image/ads/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const GenerateImage = async ({ prompt }) => {
  console.log("called generate image api");
  const auth_code = localStorage.getItem("auth_code");
  console.log("auth_code", auth_code);
  const formData = new FormData();
  formData.append("prompt", prompt);
  formData.append("auth_code", auth_code);

  const response = await axios.post(
    `${API.host}/generate-image/ads/`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const incrementViews = async (ads_id) => {
  try {
    const response = await axios.get(
      `${API.host}/ads/increment-views/${ads_id}/`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getMyAds = async ({ pageParam = 0 }) => {
  console.log("called get my ads api");
  let step = 5;
  let start = pageParam * step;
  let end = start + step;
  const auth_code = localStorage.getItem("auth_code");
  const response = await axios.get(
    `${API.host}/get/ads/${auth_code}/${start}/${end}/`
  );
  return response.data;
};
