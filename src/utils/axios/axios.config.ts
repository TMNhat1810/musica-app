import axios from 'axios';
import { API } from '../../constants/api';
import { TokenUtils } from '../token';

export const instances = axios.create({
  baseURL: API.ENDPOINT,
  timeout: 30000,
});

instances.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axios.post(API.ENDPOINT + '/auth/refresh-token', {
          token: localStorage.getItem('refresh_token'),
        });
        const { access_token } = response.data;
        TokenUtils.setAccessToken(access_token);
        instances.defaults.headers.Authorization = `Bearer ${access_token}`;
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return instances(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);
