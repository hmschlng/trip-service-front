// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { memberApi } from '../api';
import { useSnackbar } from 'notistack';

interface AuthState {
  token: string | null;
  userId: string | null;
  isAuthenticated: boolean;
}

// useAuth 훅이 반환하는 타입을 명시적으로 정의
interface UseAuthReturnType {
  auth: AuthState;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
}

export const useAuth = (): UseAuthReturnType => {
  // Recoil 대신 useState 사용
  const [auth, setAuth] = useState<AuthState>({
    token: localStorage.getItem('token'),
    userId: localStorage.getItem('userId'),
    isAuthenticated: !!localStorage.getItem('token')
  });
  
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // 컴포넌트 마운트 시 인증 상태 확인
  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await memberApi.login({ email, password });
      const { accessToken, refreshToken } = response.data.data;
      
      // 실제로는 토큰에서 userId를 추출하거나 API에서 받아와야 함
      // 여기서는 테스트를 위해 email을 userId로 사용
      const userId = email;
      
      localStorage.setItem('token', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('userId', userId);
      
      setAuth({ token: accessToken, userId, isAuthenticated: true });
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      enqueueSnackbar('로그인에 실패했습니다.', { variant: 'error' });
      return false;
    }
  };

  const logout = (): void => {
    try {
      memberApi.logout().catch(console.error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userId');
      setAuth({ token: null, userId: null, isAuthenticated: false });
      navigate('/login');
    }
  };

  const checkAuth = async (): Promise<boolean> => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    
    if (token && userId) {
      setAuth({ token, userId, isAuthenticated: true });
      return true;
    }
    
    setAuth({ token: null, userId: null, isAuthenticated: false });
    return false;
  };

  return {
    auth,
    login,
    logout,
    checkAuth,
  };
};