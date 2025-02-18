// src/types/auth.ts
export interface User {
  userId: string;
  email: string;
  name: string;
}

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
}
