// src/utils/jwtUtils.ts
/**
 * JWT 토큰에서 사용자 정보를 추출합니다.
 * 
 * @param token JWT 토큰
 * @returns 디코딩된 페이로드 또는 빈 객체
 */
export const decodeToken = (token: string): Record<string, any> => {
  try {
    // 토큰은 header.payload.signature 형태
    const base64Url = token.split('.')[1];
    if (!base64Url) return {};
    
    // base64url 디코딩
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(atob(base64));
    return payload;
  } catch (error) {
    console.error('Token decode error:', error);
    return {};
  }
};

/**
 * JWT 토큰의 만료 시간을 확인합니다.
 * 
 * @param token JWT 토큰
 * @returns 만료 여부 (true: 만료됨, false: 유효함)
 */
export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = decodeToken(token);
    if (!payload.exp) return true;
    
    // exp는 UNIX 타임스탬프 (초)
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch (error) {
    return true;
  }
};

/**
 * JWT 토큰에서 사용자 ID를 추출합니다.
 * 
 * @param token JWT 토큰
 * @returns 사용자 ID 또는 null
 */
export const getUserIdFromToken = (token: string): string | null => {
  try {
    const payload = decodeToken(token);
    // JWT의 subject 필드에 사용자 ID가 저장되어 있다고 가정
    return payload.sub || null;
  } catch (error) {
    return null;
  }
};