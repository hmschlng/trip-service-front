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

export interface WithdrawalRequest {
  reason: string;
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
    axiosInstance.post<MemberResponse>('/members/signup', data),

  login: (data: LoginRequest) => 
    axiosInstance.post<TokenResponse>('/auth/login', data),

  withdraw: (userId: string, data: WithdrawalRequest) => 
    axiosInstance.delete(`/members/${userId}`, { 
      data 
    }),

  logout: () => 
    axiosInstance.post('/auth/logout')
};

export default memberApi;