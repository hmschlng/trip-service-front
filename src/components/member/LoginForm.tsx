"use client"

// src/components/member/LoginForm.tsx
import React from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useForm } from "react-hook-form"
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  CircularProgress,
  InputAdornment,
  Divider,
  Alert,
} from "@mui/material"
import { Email, Lock, ArrowForward } from "@mui/icons-material"
import { useAuth } from "../../hooks/useAuth"

interface LoginFormInputs {
  email: string
  password: string
}

const LoginForm: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>()

  const onSubmit = async (data: LoginFormInputs) => {
    setIsLoading(true)
    setError(null)
    try {
      const success = await login(data.email, data.password)
      if (success) {
        // 로그인 성공 시 원래 가려던 경로 또는 홈으로 이동
        const from = location.state?.from?.pathname || "/"
        navigate(from, { replace: true })
      } else {
        setError("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.")
      }
    } catch (error) {
      console.error("Login error:", error)
      setError("로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.")
    } finally {
      setIsLoading(false)
    }
  }

  // 회원가입 성공 메시지 표시
  const successMessage = location.state?.successMessage

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      {successMessage && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {successMessage}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
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
        disabled={isLoading}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email fontSize="small" />
            </InputAdornment>
          ),
        }}
        sx={{
          mb: 2.5,
          "& .MuiOutlinedInput-root": {
            borderRadius: 1.5,
          },
        }}
        {...register("email", {
          required: "이메일을 입력해주세요",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "유효한 이메일 주소를 입력해주세요",
          },
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
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock fontSize="small" />
            </InputAdornment>
          ),
        }}
        sx={{
          mb: 1,
          "& .MuiOutlinedInput-root": {
            borderRadius: 1.5,
          },
        }}
        {...register("password", {
          required: "비밀번호를 입력해주세요",
          minLength: {
            value: 8,
            message: "비밀번호는 8자 이상이어야 합니다",
          },
        })}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      <Box sx={{ textAlign: "right", mb: 3 }}>
        <Link
          component="button"
          variant="body2"
          type="button"
          onClick={() => {
            /* 비밀번호 찾기 기능 */
          }}
          sx={{
            color: "text.secondary",
            textDecoration: "none",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          비밀번호를 잊으셨나요?
        </Link>
      </Box>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        disabled={isLoading}
        endIcon={!isLoading && <ArrowForward fontSize="small" />}
        sx={{
          py: 1.5,
          borderRadius: 1.5,
          textTransform: "none",
          fontSize: "1rem",
          fontWeight: 600,
          boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
        }}
      >
        {isLoading ? <CircularProgress size={24} /> : "로그인"}
      </Button>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" color="text.secondary">
          또는
        </Typography>
      </Divider>

      <Box sx={{ textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          계정이 없으신가요?
        </Typography>
        <Link
          component="button"
          type="button"
          variant="body1"
          onClick={() => navigate("/signup")}
          disabled={isLoading}
          sx={{
            fontWeight: 600,
            color: "primary.main",
            textDecoration: "none",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          회원가입
        </Link>
      </Box>
    </Box>
  )
}

export default LoginForm

