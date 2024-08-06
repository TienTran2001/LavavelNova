import axios from 'axios';
import { refreshTokenAPI } from './apis/auth';

interface Token {
  state: {
    token: string;
    refresh: string;
  };
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thêm một bộ đón chặn request
instance.interceptors.request.use(
  function (config) {
    const tokenStr = window.localStorage.getItem('laravel');
    let token: Token | null = null;

    if (tokenStr) {
      try {
        token = JSON.parse(tokenStr);
      } catch (e) {
        console.error('Failed to parse token:', e);
      }
    }

    if (token?.state.token) {
      if (config.headers) {
        config.headers['Authorization'] = `Bearer ${token.state.token}`;
      }
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Thêm một bộ đón chặn response
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalConfig = error.config;
    const { response } = error;
    if (
      response.status === 401 &&
      response.data.code === 'token_not_valid' &&
      response.data.messages[0].token_type === 'access'
    ) {
      try {
        const tokenStr = window.localStorage.getItem('laravel');
        let token: Token | null = null;

        if (tokenStr) {
          try {
            token = JSON.parse(tokenStr);
          } catch (e) {
            console.error('Failed to parse token:', e);
          }
        }
        // call api
        if (token?.state.refresh) {
          const res = await refreshTokenAPI({ refresh: token.state.refresh });
          const { access, refresh } = res.data;

          const newToken = {
            state: {
              ...token.state,
              token: access,
              refresh: refresh,
            },
          };
          localStorage.setItem('laravel', JSON.stringify(newToken));
          originalConfig.headers['Authorization'] = `Bearer ${access}`;
        }
        return instance(originalConfig);
      } catch (err) {
        localStorage.removeItem('laravel');
        window.location.href = '/login';
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
