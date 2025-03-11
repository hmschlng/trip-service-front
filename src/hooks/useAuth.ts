// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { memberApi } from '../api';
import { useSnackbar } from 'notistack';
import { decodeToken } from '../utils/jwtUtils';

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
      
      // JWT 토큰에서 userId 추출
      const decodedToken = decodeToken(accessToken);
      const userId = decodedToken.userId || null;
      
      console.log("userId: ", userId);

      if (!userId) {
        console.error('Could not extract userId from token');
        enqueueSnackbar('토큰에서 사용자 정보를 가져올 수 없습니다.', { variant: 'error' });
        return false;
      }
      
      // 토큰과 userId 저장
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
      // 토큰의 유효성 검사 추가
      const decodedToken = decodeToken(token);
      if (decodedToken && !isTokenExpired(decodedToken)) {
        setAuth({ token, userId, isAuthenticated: true });
        return true;
      } else {
        // 토큰이 만료되었거나 유효하지 않은 경우 로그아웃 처리
        logout();
        return false;
      }
    }
    
    setAuth({ token: null, userId: null, isAuthenticated: false });
    return false;
  };

  // 토큰 만료 확인 함수
  const isTokenExpired = (decodedToken: any): boolean => {
    if (!decodedToken.exp) return true;
    
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTime;
  };

  return {
    auth,
    login,
    logout,
    checkAuth,
  };
};