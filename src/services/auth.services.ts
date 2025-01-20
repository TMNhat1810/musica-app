import { AxiosInstance } from '../utils/axios';

export const signin = async (username: string, password: string) => {
  const response = await AxiosInstance.post('/auth/login', {
    username,
    password,
  });
  return response.data;
};

export const signout = async () => {
  await AxiosInstance.post('/auth/logout');
};

export const refreshToken = async (token: string) => {
  const response = await AxiosInstance.post('/auth/refresh-token', {
    token,
  });
  return response.data;
};

export const getUserProfile = async () => {
  const response = await AxiosInstance.get('/auth/profile');
  return response.data;
};
