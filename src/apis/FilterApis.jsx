import { API } from "./main";
import axios from "axios";

export const FilterBusiness = async (searchQuery) => {
  console.log("called search API");
  const response = await axios.get(
    `${API.host}/business/search-category/?name=${searchQuery}`
  );
  return response.data;
};

export const fetchBusinessesByCategory = async (category) => {
  try {
    console.log("Fetching businesses by category...");
    const response = await axios.get(
      `${API.host}/business/filter/${category}/10/`
    );
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching businesses by category:", error);
    throw new Error("Failed to fetch businesses by category");
  }
};

export const fetchAdsByCategory = async (category) => {
  try {
    console.log("Fetching ads by category...");
    const response = await axios.get(
      `${API.host}/filter/category/${category}/0/100/`
    );
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching ads by category:", error);
    throw new Error("Failed to fetch ads by category");
  }
};

export const fetchBusinessesByLocation = async (location) => {
  try {
    console.log("Fetching businesses by location...");
    const response = await axios.get(
      `${API.host}/business/filter-location/${location}/10/`
    );
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching businesses by location:", error);
    throw new Error("Failed to fetch businesses by location");
  }
};

export const fetchAdsByLocation = async (location) => {
  try {
    console.log("Fetching ads by location...");
    const response = await axios.get(
      `${API.host}/filter/location/${location}/0/100/`
    );
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching ads by location:", error);
    throw new Error("Failed to fetch ads by location");
  }
};

export const fetchAdsByAds = async (ads_type) => {
  try {
    console.log("Fetching ads by ads type...");
    const response = await axios.get(
      `${API.host}/filter/ads_type/${ads_type}/0/100/`
    );
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching ads by ads type:", error);
    throw new Error("Failed to fetch ads by ads type");
  }
};

export const fetchBusinessesByRating = async (rating) => {
  try {
    // Validate the rating parameter to ensure it's a valid number.
    const parsedRating = parseFloat(rating);
    if (isNaN(parsedRating)) {
      throw new Error(
        "Invalid rating parameter. Please provide a valid number."
      );
    }

    console.log("Fetching businesses by rating...");
    // Update the API endpoint to use the correct format for rating filtering.
    const response = await axios.get(
      `${API.host}/business/filter-rating/${parsedRating}/10/`
    );
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching businesses by rating:", error);
    throw new Error("Failed to fetch businesses by rating");
  }
};

export const fetchBlogByCategory = async (category) => {
  try {
    console.log("Fetching blogs by category...");
    const response = await axios.get(
      `${API.host}/blog/filter-by-category/${category}/`
    );
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs by category:", error);
    throw new Error("Failed to fetch blogs by category");
  }
};

export const fetchBlogsByLikes = async (start, stop) => {
  try {
    console.log("Fetching blogs by likes (high to low)...");
    const response = await axios.get(
      `${API.host}/blog/filter-by-htl/likes/${start}/${stop}/`
    );
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs by likes:", error);
    throw new Error("Failed to fetch blogs by likes");
  }
};

export const fetchBlogsByLikesLth = async (start, stop) => {
  try {
    console.log("Fetching blogs by likes (high to low)...");
    const response = await axios.get(
      `${API.host}/blog/filter-by-lth/likes/${start}/${stop}/`
    );
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs by likes:", error);
    throw new Error("Failed to fetch blogs by likes");
  }
};
