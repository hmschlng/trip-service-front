// src/hooks/useAuth.ts
import { useRecoilState } from 'recoil';
import { authState } from '../recoil/auth';
import { useNavigate } from 'react-router-dom';
import { memberApi } from '../api';

export const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const navigate = useNavigate();

  const login = (token: string, userId: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    setAuth({ token, userId, isAuthenticated: true });
  };

  const logout = async () => {
    try {
      if (auth.isAuthenticated) {
        await memberApi.logout();
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      setAuth({ token: null, userId: null, isAuthenticated: false });
      navigate('/login');
    }
  };

  const checkAuth = async () => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  
  if (!token || !userId) {
    return false;
  }
  
  try {
    // 토큰 유효성 검증을 위한 엔드포인트 호출 (API 구현 필요)
    // await memberApi.validateToken();
    setAuth({ token, userId, isAuthenticated: true });
    return true;
  } catch (error) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setAuth({ token: null, userId: null, isAuthenticated: false });
    return false;
  }
};

  return {
    auth,
    login,
    logout,
    checkAuth,
  };
};