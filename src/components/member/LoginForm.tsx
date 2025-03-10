// src/components/member/LoginForm.tsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  CircularProgress
} from '@mui/material';
import { useAuth } from '../../hooks/useAuth';

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    setIsLoading(true);
    try {
      const success = await login(data.email, data.password);
      if (success) {
        // 로그인 성공 시 원래 가려던 경로 또는 홈으로 이동
        const from = location.state?.from?.pathname || '/';
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
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
        disabled={isLoading}
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
        disabled={isLoading}
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
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} /> : '로그인'}
      </Button>
      <Box sx={{ textAlign: 'center' }}>
        <Link
          component="button"
          variant="body2"
          onClick={() => navigate('/signup')}
          disabled={isLoading}
        >
          계정이 없으신가요? 회원가입
        </Link>
      </Box>
    </Box>
  );
};

export default LoginForm;