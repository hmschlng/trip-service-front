// src/hooks/useErrorHandler.ts
import { useSnackbar } from 'notistack';
import { useAuth } from './useAuth';

export const useErrorHandler = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { logout } = useAuth();

  const handleError = (error: any) => {
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          enqueueSnackbar('인증이 필요합니다.', { variant: 'error' });
          logout();
          break;
        case 403:
          enqueueSnackbar('접근 권한이 없습니다.', { variant: 'error' });
          break;
        case 404:
          enqueueSnackbar('요청한 리소스를 찾을 수 없습니다.', { variant: 'error' });
          break;
        case 500:
          enqueueSnackbar('서버 오류가 발생했습니다.', { variant: 'error' });
          break;
        default:
          enqueueSnackbar(data.message || '오류가 발생했습니다.', { variant: 'error' });
      }
    } else if (error.request) {
      enqueueSnackbar('서버에 연결할 수 없습니다.', { variant: 'error' });
    } else {
      enqueueSnackbar('알 수 없는 오류가 발생했습니다.', { variant: 'error' });
    }
  };

  return {
    handleError,
  };
};