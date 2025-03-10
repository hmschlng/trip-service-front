// src/api/axiosInstance.ts
import axios from 'axios';
import { isTokenExpired } from '../utils/jwtUtils';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000, // 5초
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // 토큰 만료 확인
      if (isTokenExpired(token)) {
        // 리프레시 토큰으로 갱신하는 로직이 필요하지만,
        // 현재 리프레시 토큰 기능이 구현되어 있지 않아 로그아웃 처리로 단순화
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        window.location.href = '/login';
        return Promise.reject(new Error('Token expired'));
      }
      
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;