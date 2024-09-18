import axios from '../../axios';

export const loginAPI = (data: { email: string; password: string }) =>
  axios({
    url: '/cms/auth/login',
    method: 'post',
    data,
  });

export const refreshTokenAPI = (data: { refresh: string }) =>
  axios({
    url: '/refresh-token',
    method: 'post',
    data,
  });
