import { AxiosInstance } from '../utils/axios';

export const getPosts = async () => {
  const response = await AxiosInstance.get('/forum/post');
  return response.data;
};

export const uploadPost = async (
  title: string,
  type: string,
  content: string,
  images?: File[],
): Promise<void> => {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('type', type);
  formData.append('content', content);

  images?.forEach((file) => {
    formData.append('images', file);
  });

  const response = await AxiosInstance.post('/forum/post', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
