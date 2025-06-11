import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const persistedState = localStorage.getItem('user-store');
    let token: string | null = null;
    if (persistedState) {
      try {
        const parsed = JSON.parse(persistedState);
        token = parsed?.state?.accessToken ?? null;
      } catch {
        token = null;
      }
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
