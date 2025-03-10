// src/pages/Login.tsx
import React, { useEffect } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import LoginForm from '../components/member/LoginForm';
import { useAuth } from '../hooks/useAuth';

const Login: React.FC = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // 이미 로그인된 상태라면 원래 가려던 페이지 또는 홈으로 리다이렉트
  useEffect(() => {
    if (auth.isAuthenticated) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [auth.isAuthenticated, navigate, location]);

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      minHeight: '100vh',
      padding: 2
    }}>
      <Paper sx={{ maxWidth: 400, width: '100%', p: 4 }}>
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          로그인
        </Typography>
        <LoginForm />
      </Paper>
    </Box>
  );
};

export default Login;