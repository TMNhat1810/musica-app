import { AxiosInstance } from '../utils/axios';

export const uploadReply = async (comment_id: string, content: string) => {
  const response = await AxiosInstance.post(`/comment/${comment_id}/reply`, {
    content,
  });
  return response.data;
};
