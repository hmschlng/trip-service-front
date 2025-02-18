// src/recoil/auth.ts
import { atom } from 'recoil';

interface AuthState {
  token: string | null;
  userId: string | null;
  isAuthenticated: boolean;
}

export const authState = atom<AuthState>({
  key: 'authState',
  default: {
    token: localStorage.getItem('token'),
    userId: localStorage.getItem('userId'),
    isAuthenticated: !!localStorage.getItem('token')
  }
});