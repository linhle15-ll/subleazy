import axios, { AxiosError } from 'axios';
import { useUserStore } from '@/stores/user.store';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = useUserStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

type FailedQueueItem = {
  resolve: (token: string | null) => void;
  reject: (err: AxiosError) => void;
};

let failedQueue: FailedQueueItem[] = [];
let isRefreshing = false;

const processQueue = (
  error: AxiosError | null,
  token: string | null = null
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const excludedPaths = [
  '/auth/signin',
  '/auth/signup',
  '/auth/refresh',
  '/auth/signout',
];

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !excludedPaths.some((path) => originalRequest.url?.includes(path))
    ) {
      originalRequest._retry = true;
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      isRefreshing = true;

      try {
        const res = await api.post('/auth/refresh');
        const newAccessToken = res.data.accessToken;

        useUserStore.getState().setAccessToken(newAccessToken);
        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (err) {
        const axiosError = err as AxiosError;
        processQueue(axiosError, null);

        useUserStore.getState().reset();

        await api.post('/auth/signout');

        if (typeof window !== 'undefined') {
          window.location.href = '/sign-in';
        }

        return Promise.reject(axiosError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
