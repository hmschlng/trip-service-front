// src/api/memberApi.ts
import axiosInstance from './axiosInstance';
import { ApiResponse } from '../types/api';

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

export interface MemberResponse {
  userId: string;
  email: string;
  name: string;
}

const memberApi = {
  signUp: (data: SignUpRequest) => 
    axiosInstance.post<ApiResponse<MemberResponse>>('/members/signup', data),

  login: (data: LoginRequest) => 
    axiosInstance.post<ApiResponse<TokenResponse>>('/auth/login', data),

  withdraw: (userId: string, reason: string) => 
    axiosInstance.delete<ApiResponse<void>>(`/members/${userId}`, { 
      data: { reason } 
    }),

  logout: () => 
    axiosInstance.post<ApiResponse<void>>('/auth/logout')
};

export default memberApi;