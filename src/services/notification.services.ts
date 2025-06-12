import { AxiosInstance } from '../utils/axios';

export const getNotifications = async () => {
  const response = await AxiosInstance.get('/user/c/notification');
  return response.data;
};

export const getUnreadNotifications = async () => {
  const response = await AxiosInstance.get('/user/c/notification/unread');
  return response.data;
};

export const readAllNotifications = async () => {
  const response = await AxiosInstance.patch('/user/c/notification/read-all');
  return response.data;
};

export const readNotification = async (notification_id: string) => {
  const response = await AxiosInstance.patch(
    `/notification/${notification_id}/read`,
  );
  return response.data;
};

export const deleteNotification = async (notification_id: string) => {
  const response = await AxiosInstance.delete(`/notification/${notification_id}`);
  return response.data;
};
