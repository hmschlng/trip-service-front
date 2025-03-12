"use client"

import type React from "react"
import { Box, Typography, Paper, Button, useTheme, useMediaQuery } from "@mui/material"
import { useNavigate } from "react-router-dom"
import SignUpForm from "../components/member/SignUpForm"
import { Flight, Hiking, DirectionsBoat } from "@mui/icons-material"

const SignUp: React.FC = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#f7f9fc",
      }}
    >
      {/* Left side - Decorative content (hidden on mobile) */}
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
                <Flight sx={{ fontSize: 48 }} />
                <Hiking sx={{ fontSize: 48 }} />
                <DirectionsBoat sx={{ fontSize: 48 }} />
              </Box>

              <Typography variant="h3" fontWeight="bold" sx={{ mb: 3 }}>
                새로운 여행의 시작
              </Typography>

              <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                회원가입하고 나만의 특별한 여행 경험을 만들어보세요
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  width: "100%",
                  maxWidth: 400,
                  mb: 4,
                }}
              >
                {[
                  { title: "맞춤형 여행 계획", desc: "당신의 취향과 일정에 맞는 최적의 여행 계획을 세워보세요" },
                  { title: "AI 여행지 추천", desc: "인공지능이 분석한 최적의 여행지를 추천받을 수 있습니다" },
                  { title: "여행 후기 공유", desc: "특별했던 여행의 순간을 기록하고 다른 사람들과 공유해보세요" },
                ].map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      bgcolor: "rgba(255,255,255,0.2)",
                      p: 2,
                      borderRadius: 2,
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography variant="body2">{item.desc}</Typography>
                  </Box>
                ))}
              </Box>

              <Button
                variant="outlined"
                color="inherit"
                size="large"
                onClick={() => navigate("/login")}
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
                이미 계정이 있으신가요?
              </Button>
            </Box>
          </Box>
        </Box>
      )}

      {/* Right side - Signup form */}
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
            <Typography component="h1" variant="h4" fontWeight="bold" color="primary.main" sx={{ mb: 1 }}>
              회원가입
            </Typography>
            <Typography variant="body1" color="text.secondary">
              여행의 모든 순간을 함께할 계정을 만들어보세요
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
            <SignUpForm />
          </Paper>
        </Box>
      </Box>
    </Box>
  )
}

export default SignUp

