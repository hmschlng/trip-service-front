
// src/utils/api.ts
import { AxiosError } from 'axios';
import { ApiResponse } from '../types';

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return (error as AxiosError).isAxiosError !== undefined;
}

export function handleApiError(error: unknown): string {
  if (isAxiosError<ApiResponse<any>>(error)) {
    return error.response?.data?.message || '서버 오류가 발생했습니다.';
  }
  if (error instanceof Error) {
    return error.message;
  }
  return '알 수 없는 오류가 발생했습니다.';
}