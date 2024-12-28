import axios from "axios";

const apiUrl = await import.meta.env.VITE_API_URL;
const apiToken = await import.meta.env.VITE_API_TOKEN;

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
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
