// src/components/member/SignUpForm.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Alert
} from '@mui/material';
import memberApi, { SignUpRequest } from '../../api/memberApi';

const SignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpRequest>();

  const onSubmit = async (data: SignUpRequest) => {
    try {
      setError(null);
      await memberApi.signUp(data);
      navigate('/login', { state: { message: '회원가입이 완료되었습니다. 로그인해주세요.' } });
    } catch (error: any) {
      console.error('SignUp error:', error);
      setError(error.response?.data?.message || '회원가입에 실패했습니다.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
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
        {...register('password', {
          required: '비밀번호를 입력해주세요',
          pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            message: '비밀번호는 영문, 숫자, 특수문자를 포함하여 8자 이상이어야 합니다'
          }
        })}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="이름"
        {...register('name', {
          required: '이름을 입력해주세요',
          minLength: {
            value: 2,
            message: '이름은 2자 이상이어야 합니다'
          }
        })}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        회원가입
      </Button>
      <Box sx={{ textAlign: 'center' }}>
        <Link
          component="button"
          variant="body2"
          onClick={() => navigate('/login')}
        >
          이미 계정이 있으신가요? 로그인
        </Link>
      </Box>
    </Box>
  );
};

export default SignUpForm;