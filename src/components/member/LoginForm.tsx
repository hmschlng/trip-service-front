// src/components/member/LoginForm.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Box,
  TextField,
  Button,
  Typography,
  Link
} from '@mui/material';

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      // TODO: API 연동
      console.log('Login data:', data);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="이메일"
        autoComplete="email"
        autoFocus
        {...register('email', {
          required: '이메일을 입력해주세요',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: '유효한 이메일 주소를 입력해주세요'
          }
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="비밀번호"
        type="password"
        id="password"
        autoComplete="current-password"
        {...register('password', {
          required: '비밀번호를 입력해주세요',
          minLength: {
            value: 8,
            message: '비밀번호는 8자 이상이어야 합니다'
          }
        })}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        로그인
      </Button>
      <Box sx={{ textAlign: 'center' }}>
        <Link
          component="button"
          variant="body2"
          onClick={() => navigate('/signup')}
        >
          계정이 없으신가요? 회원가입
        </Link>
      </Box>
    </Box>
  );
};

export default LoginForm;