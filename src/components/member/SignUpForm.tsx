"use client"

// src/components/member/SignUpForm.tsx
import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  CircularProgress,
  Alert,
  InputAdornment,
  Divider,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material"
import { Email, Lock, Person, ArrowForward, Check } from "@mui/icons-material"
import { memberApi } from "../../api"
import { extractResponseData, extractErrorMessage } from "../../utils/apiUtils"

interface SignUpFormInputs {
  email: string
  password: string
  confirmPassword: string
  name: string
}

const SignUpForm: React.FC = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeStep, setActiveStep] = useState(0)
  const steps = ["계정 정보", "개인 정보"]

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = useForm<SignUpFormInputs>({
    mode: "onChange",
  })

  const password = watch("password")

  const handleNext = async () => {
    const isValid = await trigger(["email", "password", "confirmPassword"])
    if (isValid) {
      setActiveStep(1)
    }
  }

  const handleBack = () => {
    setActiveStep(0)
  }

  const onSubmit = async (data: SignUpFormInputs) => {
    try {
      setIsLoading(true)
      setError(null)

      const signUpData = {
        email: data.email,
        password: data.password,
        name: data.name,
      }

      const response = await memberApi.signUp(signUpData)

      // 응답에서 데이터 추출
      extractResponseData(response)

      // 회원가입 성공 처리
      navigate("/login", { state: { successMessage: "회원가입이 성공적으로 완료되었습니다. 로그인해주세요." } })
    } catch (error: any) {
      console.error("SignUp error:", error)
      setError(extractErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 ? (
        // Step 1: 계정 정보
        <>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="이메일"
            autoComplete="email"
            autoFocus
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock fontSize="small" />
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 2.5,
              "& .MuiOutlinedInput-root": {
                borderRadius: 1.5,
              },
            }}
            {...register("password", {
              required: "비밀번호를 입력해주세요",
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                message: "비밀번호는 영문, 숫자, 특수문자를 포함하여 8자 이상이어야 합니다",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="비밀번호 확인"
            type="password"
            id="confirmPassword"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock fontSize="small" />
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: 1.5,
              },
            }}
            {...register("confirmPassword", {
              required: "비밀번호를 다시 입력해주세요",
              validate: (value) => value === password || "비밀번호가 일치하지 않습니다",
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            onClick={handleNext}
            endIcon={<ArrowForward />}
            sx={{
              py: 1.5,
              borderRadius: 1.5,
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 600,
              boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
            }}
          >
            다음 단계
          </Button>
        </>
      ) : (
        // Step 2: 개인 정보
        <>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="이름"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person fontSize="small" />
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: 1.5,
              },
            }}
            {...register("name", {
              required: "이름을 입력해주세요",
              minLength: {
                value: 2,
                message: "이름은 2자 이상이어야 합니다",
              },
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={handleBack}
              sx={{
                flex: 1,
                py: 1.5,
                borderRadius: 1.5,
                textTransform: "none",
              }}
            >
              이전
            </Button>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={isLoading}
              endIcon={!isLoading && <Check />}
              sx={{
                flex: 2,
                py: 1.5,
                borderRadius: 1.5,
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 600,
                boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
              }}
            >
              {isLoading ? <CircularProgress size={24} /> : "회원가입 완료"}
            </Button>
          </Box>
        </>
      )}

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" color="text.secondary">
          또는
        </Typography>
      </Divider>

      <Box sx={{ textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          이미 계정이 있으신가요?
        </Typography>
        <Link
          component="button"
          type="button"
          variant="body1"
          onClick={() => navigate("/login")}
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
          로그인하기
        </Link>
      </Box>
    </Box>
  )
}

export default SignUpForm

