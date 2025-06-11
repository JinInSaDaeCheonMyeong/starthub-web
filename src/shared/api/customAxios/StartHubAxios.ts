import axios from 'axios';
import Cookies from 'js-cookie';

const StartHubAxios = axios.create({
  baseURL: process.env.VITE_API_BASE_URL,
  withCredentials: true,
  timeout: 10000
});

StartHubAxios.interceptors.request.use((config) => {
  const token = Cookies.get('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

StartHubAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      Cookies.remove('access_token');
      window.location.href = '/sign-in';
    }
    return Promise.reject(error);
  }
);

export default StartHubAxios;