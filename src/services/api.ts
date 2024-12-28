import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const apiToken = import.meta.env.VITE_API_TOKEN;

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiToken}`,
    "Access-Control-Allow-Origin": "*",
  },
});

api.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${apiToken}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
