"use client"

import type React from "react"
import { useEffect } from "react"
import { Box, Typography, Paper, Button, useTheme, useMediaQuery } from "@mui/material"
import { useNavigate, useLocation } from "react-router-dom"
import LoginForm from "../components/member/LoginForm"
import { useAuth } from "../hooks/useAuth"
import { LocationOn, Explore, BeachAccess } from "@mui/icons-material"

const Login: React.FC = () => {
  const { auth } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  // 이미 로그인된 상태라면 원래 가려던 페이지 또는 홈으로 리다이렉트
  useEffect(() => {
    if (auth.isAuthenticated) {
      const from = location.state?.from?.pathname || "/"
      navigate(from, { replace: true })
    }
  }, [auth.isAuthenticated, navigate, location])

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#f7f9fc",
      }}
    >
      {/* Left side - Login form */}
      <Box
        sx={{
          flex: { xs: "1", md: "0.4" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          p: { xs: 2, sm: 4, md: 6 },
        }}
      >
        <Box sx={{ maxWidth: 480, width: "100%", mx: "auto" }}>
          <Box sx={{ mb: 5, textAlign: "center" }}>
            <Typography component="h1" variant="h4" fontWeight="bold" color="primary" sx={{ mb: 1 }}>
              여행 서비스
            </Typography>
            <Typography variant="body1" color="text.secondary">
              로그인하여 나만의 여행 계획을 시작하세요
            </Typography>
          </Box>

          <Paper
            elevation={isMobile ? 1 : 0}
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 2,
              bgcolor: "white",
              boxShadow: isMobile ? "0px 2px 8px rgba(0,0,0,0.1)" : "0px 8px 20px rgba(0,0,0,0.05)",
            }}
          >
            <LoginForm />
          </Paper>
        </Box>
      </Box>

      {/* Right side - Decorative content (hidden on mobile) */}
      {!isMobile && (
        <Box
          sx={{
            flex: "0.6",
            display: { xs: "none", md: "flex" },
            position: "relative",
            bgcolor: "primary.main",
            color: "white",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.1,
              backgroundImage: 'url("/placeholder.svg?height=800&width=800")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          <Box
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              p: 6,
              zIndex: 1,
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                maxWidth: 500,
                textAlign: "center",
              }}
            >
              <Box sx={{ mb: 4, display: "flex", gap: 2 }}>
                <BeachAccess sx={{ fontSize: 48 }} />
                <Explore sx={{ fontSize: 48 }} />
                <LocationOn sx={{ fontSize: 48 }} />
              </Box>

              <Typography variant="h3" fontWeight="bold" sx={{ mb: 3 }}>
                여행의 모든 순간을 함께
              </Typography>

              <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                계획부터 후기까지, 당신의 특별한 여행을 더욱 특별하게 만들어 드립니다
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                  justifyContent: "center",
                  mb: 4,
                }}
              >
                {["맞춤 여행 계획", "인공지능 추천", "여행 후기 공유", "실시간 날씨 정보"].map((feature, index) => (
                  <Box
                    key={index}
                    sx={{
                      bgcolor: "rgba(255,255,255,0.2)",
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <Typography variant="body2">{feature}</Typography>
                  </Box>
                ))}
              </Box>

              <Button
                variant="outlined"
                color="inherit"
                size="large"
                onClick={() => navigate("/signup")}
                sx={{
                  borderRadius: 2,
                  px: 4,
                  borderColor: "rgba(255,255,255,0.5)",
                  "&:hover": {
                    borderColor: "white",
                    bgcolor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                회원가입하기
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default Login

