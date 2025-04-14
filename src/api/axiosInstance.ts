// src/api/axiosInstance.ts
import axios from 'axios';
import useAuthStore from '../store/authStore';

const api = axios.create({
  baseURL: 'http://localhost:5173', // Ensure this matches the Vite server's URL
  timeout: 5000,
});

// Add an interceptor to include the token in the Authorization header
api.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;