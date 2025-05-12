import { AxiosInstance } from '../utils/axios';

export const logViewMedia = async (media_id: string) => {
  const response = await AxiosInstance.post('/history/media/view', {
    media_id,
  });
  return response.data;
};
