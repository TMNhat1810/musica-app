import { AxiosInstance } from '../utils/axios';

export const getUserStats = async (user_id: string) => {
  const response = await AxiosInstance.get('/statistics/user', {
    params: { id: user_id },
  });
  return response.data;
};

export const getMediaStats = async (media_id: string) => {
  const response = await AxiosInstance.get('/statistics/media', {
    params: { id: media_id },
  });
  return response.data;
};
