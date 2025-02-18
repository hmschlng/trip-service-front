// src/components/member/SignUpForm.tsx
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

interface SignUpFormInputs {
  email: string;
  password: string;
  name: string;
}

const SignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormInputs>();

  const onSubmit = async (data: SignUpFormInputs) => {
    try {
      // TODO: API 연동
      console.log('SignUp data:', data);
      navigate('/login');
    } catch (error) {
      console.error('SignUp error:', error);
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