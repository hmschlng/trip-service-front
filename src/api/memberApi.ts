// src/api/memberApi.ts
import axiosInstance from './axiosInstance';

export interface SignUpRequest {
  email: string;
  password: string;
  name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

const memberApi = {
  signUp: (data: SignUpRequest) => 
    axiosInstance.post('/api/members/signup', data),

  login: (data: LoginRequest) => 
    axiosInstance.post<TokenResponse>('/api/auth/login', data),

  withdraw: (userId: string, reason: string) => 
    axiosInstance.delete(`/api/members/${userId}`, { 
      data: { reason } 
    }),

  logout: () => 
    axiosInstance.post('/api/auth/logout')
};

export default memberApi;