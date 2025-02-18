// src/hooks/useApi.ts
import axios, { AxiosError } from 'axios';
import { useAuth } from './useAuth';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

interface ApiError {
  status: number;
  message: string;
}

export const useApi = () => {
  const { auth, logout } = useAuth();

  const api = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  api.interceptors.request.use(
    (config) => {
      if (auth.token) {
        config.headers.Authorization = `Bearer ${auth.token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        logout();
      }
      return Promise.reject(error);
    }
  );

  const handleApiError = (error: unknown): ApiError => {
    if (axios.isAxiosError(error)) {
      return {
        status: error.response?.status || 500,
        message: error.response?.data?.message || '서버 오류가 발생했습니다.',
      };
    }
    return {
      status: 500,
      message: '알 수 없는 오류가 발생했습니다.',
    };
  };

  return {
    api,
    handleApiError,
  };
};