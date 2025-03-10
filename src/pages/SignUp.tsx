// src/pages/SignUp.tsx
import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import SignUpForm from '../components/member/SignUpForm';

const SignUp: React.FC = () => {
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
          회원가입
        </Typography>
        <SignUpForm />
      </Paper>
    </Box>
  );
};

export default SignUp;