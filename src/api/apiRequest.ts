import axios from 'axios';
import { configs } from "../configs/configs";

const request = axios.create({
  baseURL: configs.API_BASE_URL,
  timeout: configs.TIMEOUT,
});

request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default request;