import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

// 토큰 재발급 요청을 위한 인터페이스
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const StartHubAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
StartHubAxios.interceptors.request.use(
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
StartHubAxios.interceptors.response.use(
  (response) => response,
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

        console.log('토큰 재발급 응답:', refreshResponse.data);

        const responseData = refreshResponse.data;
        const accessToken = responseData.data?.accessToken || responseData.accessToken;
        const newRefreshToken = responseData.data?.refreshToken || responseData.refreshToken;

        if (!accessToken) {
          throw new Error('Access token not found in response');
        }

        // 새로운 토큰 저장
        Cookies.set('access_token', accessToken, { expires: 1 });
        if (newRefreshToken) {
          Cookies.set('refresh_token', newRefreshToken, { expires: 7 });
        }

        // 실패했던 요청 재시도
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return StartHubAxios(originalRequest);
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

export default StartHubAxios;