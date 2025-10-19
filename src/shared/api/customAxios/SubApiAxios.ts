import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const SubApiAxios = axios.create({
  baseURL: 'https://subapi.start-hub.kr',
  withCredentials: true,
  timeout: 120000, // 2분
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
SubApiAxios.interceptors.request.use(
  (config) => {
    const token = Cookies.get('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
SubApiAxios.interceptors.response.use(
  (response) => response.data,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get('refresh_token');
        if (!refreshToken) {
          throw new Error('No refresh token');
        }

        const refreshResponse = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/user/reissue`,
          { refreshToken },
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        );

        const responseData = refreshResponse.data;
        const accessToken = responseData.data?.accessToken || responseData.accessToken;
        const newRefreshToken = responseData.data?.refreshToken || responseData.refreshToken;

        if (!accessToken) {
          throw new Error('Access token not found in response');
        }

        Cookies.set('access_token', accessToken, { expires: 1 });
        if (newRefreshToken) {
          Cookies.set('refresh_token', newRefreshToken, { expires: 7 });
        }

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return SubApiAxios(originalRequest);
      } catch (refreshError) {
        console.error('토큰 재발급 실패:', refreshError);
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        window.location.href = '/sign-in';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default SubApiAxios;
