import axios from 'axios';
import { ApiError } from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const apiError: ApiError = {
      message: error.response?.data?.message || error.message || 'An error occurred',
      status: error.response?.status,
    };
    return Promise.reject(apiError);
  }
);

export const apiService = {
  get: <T>(url: string) => api.get<T, T>(url),
  
  post: <T>(url: string, data: unknown) => api.post<T, T>(url, data),
  
  put: <T>(url: string, data: unknown) => api.put<T, T>(url, data),
  
  delete: <T>(url: string) => api.delete<T, T>(url),
};

export default apiService;