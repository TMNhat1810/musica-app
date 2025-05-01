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
