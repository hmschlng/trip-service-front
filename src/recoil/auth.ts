// src/recoil/auth.ts
import { atom } from 'recoil';

interface AuthState {
  token: string | null;
  userId: string | null;
  isAuthenticated: boolean;
}

// 초기 상태 설정
const initialState: AuthState = {
  token: localStorage.getItem('token'),
  userId: localStorage.getItem('userId'),
  isAuthenticated: !!localStorage.getItem('token')
};

export const authState = atom<AuthState>({
  key: 'authState',
  default: initialState
});