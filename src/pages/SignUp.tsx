// src/pages/SignUp.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import SignUpForm from '../components/member/SignUpForm';
import PageContainer from '../components/common/PageContainer';

const SignUp: React.FC = () => {
  return (
    <PageContainer maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          회원가입
        </Typography>
        <SignUpForm />
      </Box>
    </PageContainer>
  );
};

export default SignUp;