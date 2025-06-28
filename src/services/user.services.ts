import { AxiosInstance } from '../utils/axios';
import { UpdateCurrentUserProfileDto } from './dtos';

export const register = async (
  username: string,
  display_name: string,
  email: string,
  password: string,
) => {
  const response = await AxiosInstance.post('/auth/register', {
    username,
    display_name,
    email,
    password,
  });
  return response.data;
};

export const getUserById = async (id: string) => {
  const response = await AxiosInstance.get('/user/' + id);
  return response.data;
};

export const updateCurrentUserProfile = async (
  data: UpdateCurrentUserProfileDto,
) => {
  const response = await AxiosInstance.patch('/user/c/profile', data);
  return response.data;
};

export const updateCurrentUserAvatar = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await AxiosInstance.patch('/user/c/avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateCurrentUserPassword = async (
  currentPassword: string,
  newPassword: string,
) => {
  const response = await AxiosInstance.patch('/user/c/password', {
    currentPassword,
    newPassword,
  });
  return response.data;
};

export const getCurrentUserFollowees = async () => {
  const response = await AxiosInstance.get('/user/c/followee');
  return response.data;
};

export const getCurrentUserFolloweesMedias = async (
  page: number = 1,
  limit: number = 10,
) => {
  const response = await AxiosInstance.get('/user/c/followee/media', {
    params: { page, limit },
  });
  return response.data;
};

export const getUserMedia = async (
  id: string,
  query?: string,
  page: number = 1,
  limit: number = 10,
) => {
  const params = query ? { page, limit, query } : { page, limit };
  const response = await AxiosInstance.get(`/user/${id}/media`, {
    params,
  });
  return response.data;
};

export const getAllUserMedia = async (
  id: string,
  query?: string,
  page: number = 1,
  limit: number = 10,
) => {
  const params = query
    ? { page, limit, query, allowAll: 'true' }
    : { page, limit, allowAll: 'true' };
  const response = await AxiosInstance.get(`/user/${id}/media`, {
    params,
  });
  return response.data;
};

export const getUserForumPost = async (
  id: string,
  query?: string,
  page: number = 1,
  limit: number = 10,
) => {
  const params = query ? { page, limit, query } : { page, limit };
  const response = await AxiosInstance.get(`/user/${id}/post`, {
    params,
  });
  return response.data;
};

export const getUserLogs = async (
  action: string = 'all',
  page: number = 1,
  limit: number = 10,
) => {
  const response = await AxiosInstance.get('/history', {
    params: { action, page, limit },
  });
  return response.data;
};

export const checkUserFollow = async (followee_id: string) => {
  const response = await AxiosInstance.get(`/user/${followee_id}/follow`);
  return response.data;
};

export const followUser = async (followee_id: string) => {
  const response = await AxiosInstance.post(`/user/${followee_id}/follow`);
  return response.data;
};

export const unfollowUser = async (followee_id: string) => {
  const response = await AxiosInstance.delete(`/user/${followee_id}/follow`);
  return response.data;
};

export const getUserLikedMedias = async (page: number = 1, limit: number = 10) => {
  const response = await AxiosInstance.get('/user/c/liked', {
    params: { page, limit },
  });
  return response.data;
};

export const searchUsers = async (
  query: string,
  limit: number = 10,
  page: number = 1,
) => {
  const response = await AxiosInstance.get('/user/search', {
    params: { query, page, limit },
  });
  return response.data;
};
