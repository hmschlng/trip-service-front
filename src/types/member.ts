// src/types/member.ts
export interface Member {
  userId: string;
  email: string;
  name: string;
  status: MemberStatus;
  withdrawalReason?: string;
  createdAt: string;
  updatedAt: string;
}

export type MemberStatus = 'ACTIVE' | 'WITHDRAWN';

export interface Credentials {
  email: string;
  password: string;
}

export interface TokenInfo {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}