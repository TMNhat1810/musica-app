import { AxiosInstance } from '../utils/axios';

export const getUserStats = async (user_id: string) => {
  const response = await AxiosInstance.get('/statistics/user', {
    params: { user_id },
  });
  return response.data;
};

export const getMediaStats = async (media_id: string) => {
  const response = await AxiosInstance.get('/statistics/user', {
    params: { media_id },
  });
  return response.data;
};
