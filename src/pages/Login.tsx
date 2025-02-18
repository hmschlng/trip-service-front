// src/pages/Login.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import LoginForm from '../components/member/LoginForm';
import PageContainer from '../components/common/PageContainer';

const Login: React.FC = () => {
  return (
    <PageContainer maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          로그인
        </Typography>
        <LoginForm />
      </Box>
    </PageContainer>
  );
};

export default Login;