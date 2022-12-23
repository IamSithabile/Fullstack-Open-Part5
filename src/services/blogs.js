import axios from "axios";
const baseUrl = "/api/blogs";

export const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

export const create = async (blogObject, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const request = await axios.post(baseUrl, blogObject, config);
  return request.data;
};
