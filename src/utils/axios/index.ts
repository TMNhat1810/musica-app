import { instances } from './axios.config';

function setAuthHeader(token: string) {
  instances.defaults.headers.common.Authorization = 'Bearer ' + token;
}

export { instances as AxiosInstance, setAuthHeader };
