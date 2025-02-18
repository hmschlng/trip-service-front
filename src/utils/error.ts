// src/utils/error.ts
import { AxiosError } from 'axios';

export const getErrorMessage = (error: unknown) => {
  if (error instanceof AxiosError) {
    return error.response?.data?.message || '서버 오류가 발생했습니다.';
  }
  if (error instanceof Error) {
    return error.message;
  }
  return '알 수 없는 오류가 발생했습니다.';
};