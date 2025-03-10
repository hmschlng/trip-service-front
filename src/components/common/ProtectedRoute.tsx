// src/components/common/ProtectedRoute.tsx
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from './LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { auth } = useAuth();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // 이미 로컬 스토리지에서 토큰 확인이 완료된 상태라면 추가 검사 불필요
    setIsChecking(false);
  }, []);

  if (isChecking) {
    return <LoadingSpinner />;
  }

  if (!auth.isAuthenticated) {
    // 로그인 페이지로 리다이렉트하며 원래 가려던 경로를 state로 전달
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;