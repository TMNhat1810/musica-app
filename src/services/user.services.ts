import { AxiosInstance } from '../utils/axios';

export const register = async (
  username: string,
  display_name: string,
  email: string,
  password: string,
) => {
  const response = await AxiosInstance.post('/auth/register', {
    username,
    display_name,
    email,
    password,
  });
  return response.data;
};
