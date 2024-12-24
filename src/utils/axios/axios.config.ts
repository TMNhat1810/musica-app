import axios from 'axios';
import { API } from '../../constants/api';

export const instances = axios.create({
  baseURL: API.ENDPOINT,
  timeout: 30000,
});

instances.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async function (error) {
    return Promise.reject(error);
  },
);
