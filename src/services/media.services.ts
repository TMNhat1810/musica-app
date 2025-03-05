import { AxiosInstance } from '../utils/axios';

export const getMedias = async (page: number = 1, limit: number = 10) => {
  const response = await AxiosInstance.get('/media', {
    params: {
      page,
      limit,
    },
  });
  return response.data;
};

export const getMediaById = async (id: string) => {
  const response = await AxiosInstance.get('/media/' + id);
  return response.data;
};

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
    timeout: 0,
  });
  return response.data;
};

export const getCommentsByMediaId = async (id: string) => {
  const response = await AxiosInstance.get(`/media/${id}/comment`);
  return response.data;
};

export const uploadComment = async (id: string, content: string) => {
  const response = await AxiosInstance.post(`/media/${id}/comment`, {
    content,
  });
  return response.data;
};

export const getSuggestMedia = async (id: string) => {
  const response = await AxiosInstance.get('/media', { params: { except: id } });
  return response.data;
};
