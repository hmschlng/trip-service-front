// src/hooks/useAuth.ts
import { useRecoilState } from 'recoil';
import { authState } from '../recoil/auth';
import { useNavigate } from 'react-router-dom';
import { memberApi } from '../api';
import { useSnackbar } from 'notistack';

// useAuth 훅이 반환하는 타입을 명시적으로 정의
interface UseAuthReturnType {
  auth: {
    token: string | null;
    userId: string | null;
    isAuthenticated: boolean;
  };
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
}

export const useAuth = (): UseAuthReturnType => {
  const [auth, setAuth] = useRecoilState(authState);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await memberApi.login({ email, password });
      const { accessToken, refreshToken } = response.data.data;
      
      // API 응답에서 userId를 받는다고 가정
      // 실제로는 API가 userId를 제공하는 방식에 따라 조정이 필요
      const userId = 'user-123'; // 테스트용 하드코딩 값
      
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
      // 간단히 토큰과 userId가 있으면 인증된 것으로 간주
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