import { AxiosInstance } from '../utils/axios';

export const uploadReply = async (comment_id: string, content: string) => {
  const response = await AxiosInstance.post(`/comment/${comment_id}/reply`, {
    content,
  });
  return response.data;
};

export const editMediaComment = async (comment_id: string, content: string) => {
  const response = await AxiosInstance.patch(`/comment/${comment_id}`, {
    content,
    forum: false,
  });
  return response.data;
};

export const editForumComment = async (comment_id: string, content: string) => {
  const response = await AxiosInstance.patch(`/comment/${comment_id}`, {
    content,
    forum: true,
  });
  return response.data;
};
