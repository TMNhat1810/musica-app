import { AxiosInstance } from '../utils/axios';

export const uploadMedia = async (
  title: string,
  description: string,
  media: File,
  thumbnail: File | null,
) => {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('media', media);

  if (thumbnail) {
    formData.append('thumbnail', thumbnail);
  }
  const response = await AxiosInstance.post('/media', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
