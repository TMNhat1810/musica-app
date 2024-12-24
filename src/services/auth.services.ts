import { AxiosInstance } from '../utils/axios';

export const login = async (email: string, password: string) => {
  const response = await AxiosInstance.post('/auth/login', {
    email,
    password,
  });
  return response.data;
};

export const logout = async () => {
  await AxiosInstance.post('/auth/logout');
};

export const refreshToken = async (token: string) => {
  const response = await AxiosInstance.post('/auth/refresh-token', {
    token,
  });
  return response.data;
};
