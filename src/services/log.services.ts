import { AxiosInstance } from '../utils/axios';

export const logViewMedia = async (media_id: string) => {
  const response = await AxiosInstance.post('/history/media/view', {
    media_id,
  });
  return response.data;
};

export const logMediaViewDetail = async (
  media_id: string,
  watched_seconds: number,
) => {
  const response = await AxiosInstance.post(`/media/${media_id}/view`, {
    watched_seconds,
  });
  return response.data;
};
