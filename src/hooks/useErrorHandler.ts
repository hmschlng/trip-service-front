// src/hooks/useErrorHandler.ts
import { useState } from 'react';
import { useAuth } from './useAuth';

export const useErrorHandler = () => {
  const [error, setError] = useState<string | null>(null);
  const { logout } = useAuth();

  const handleError = (error: any): string => {
    let errorMessage = '알 수 없는 오류가 발생했습니다.';
    
    if (error.response) {
      const { status, data } = error.response;
      errorMessage = data?.message || errorMessage;

      switch (status) {
        case 401:
          logout();
          errorMessage = '인증이 필요합니다. 다시 로그인해주세요.';
          break;
        case 403:
          errorMessage = '접근 권한이 없습니다.';
          break;
        case 404:
          errorMessage = '요청한 리소스를 찾을 수 없습니다.';
          break;
        case 500:
          errorMessage = '서버 오류가 발생했습니다.';
          break;
      }
    } else if (error.request) {
      errorMessage = '서버에 연결할 수 없습니다.';
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    setError(errorMessage);
    return errorMessage;
  };

  const clearError = () => {
    setError(null);
  };

  return {
    error,
    handleError,
    clearError
  };
};