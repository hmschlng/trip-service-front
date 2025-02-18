// src/hooks/useAuth.ts
import { useRecoilState } from 'recoil';
import { authState } from '../recoil/auth';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const navigate = useNavigate();

  const login = (token: string, userId: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    setAuth({ token, userId, isAuthenticated: true });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setAuth({ token: null, userId: null, isAuthenticated: false });
    navigate('/login');
  };

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token && userId) {
      setAuth({ token, userId, isAuthenticated: true });
      return true;
    }
    return false;
  };

  return {
    auth,
    login,
    logout,
    checkAuth,
  };
};