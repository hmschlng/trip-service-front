// src/utils/apiUtils.ts
import { ApiResponse } from '../types/api';
import { AxiosResponse } from 'axios';

/**
 * Axios 응답에서 실제 데이터를 추출합니다.
 * API 응답은 ApiResponse 래퍼 안에 실제 데이터가 있는 구조입니다.
 */
export function extractResponseData<T>(response: AxiosResponse<ApiResponse<T>>): T {
  return response.data.data;
}

/**
 * API 오류 메시지를 추출합니다.
 */
export function extractErrorMessage(error: any): string {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  return error.message || '알 수 없는 오류가 발생했습니다.';
}