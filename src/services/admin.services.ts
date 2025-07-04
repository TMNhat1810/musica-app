import { AxiosInstance } from '../utils/axios';

export const getMedias = async (
  query?: string,
  limit: number = 10,
  page: number = 1,
) => {
  const params = query ? { page, limit, query } : { page, limit };
  const response = await AxiosInstance.get('/media/search/no-rs', { params });
  return response.data;
};

export const getUsers = async (
  query?: string,
  page: number = 1,
  limit: number = 10,
) => {
  const params = query ? { page, limit, query } : { page, limit };
  const response = await AxiosInstance.get('/user/search', { params });
  return response.data;
};

export const getGlobalStatistics = async () => {
  const response = await AxiosInstance.get('/statistics/global');
  return response.data;
};

export const getPendingMedias = async (
  query?: string,
  limit: number = 10,
  page: number = 1,
) => {
  const params = query ? { page, limit, query } : { page, limit };
  const response = await AxiosInstance.get('/media/pending', { params });
  return response.data;
};

export const approveMedia = async (media_id: string) => {
  const response = await AxiosInstance.patch(`/media/${media_id}/approve`);
  return response.data;
};
