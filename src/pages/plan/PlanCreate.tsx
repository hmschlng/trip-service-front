"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
  Slider,
  Paper,
  Grid,
  IconButton,
  Fade,
  useTheme,
  useMediaQuery,
  Avatar,
  Container,
  Divider,
  Stack,
  InputLabel,
  FormControl,
} from "@mui/material"
import {
  AttachMoneyOutlined,
  AddCircleOutline,
  RemoveCircleOutline,
  FlightTakeoff,
  EmojiPeople,
  Palette,
  ArrowForward,
  ArrowBack,
  CalendarMonth,
} from "@mui/icons-material"

const steps = [
  {
    label: "기본 정보",
    icon: <FlightTakeoff />,
    description: "여행의 제목과 날짜를 설정해주세요",
    images: [
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1121&q=80",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    ],
  },
  {
    label: "동행자",
    icon: <EmojiPeople />,
    description: "함께 여행할 친구나 가족을 추가해주세요",
    images: [
      "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80",
    ],
  },
  {
    label: "테마 선택",
    icon: <Palette />,
    description: "여행의 테마를 선택해주세요",
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    ],
  },
  {
    label: "예산 설정",
    icon: <AttachMoneyOutlined />,
    description: "여행 예산을 설정해주세요",
    images: [
      "https://images.unsplash.com/photo-1565073182887-6bcefbe225b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1194&q=80",
    ],
  },
]

const themes = [
  { name: "자연", icon: "🏞️", color: "#4CAF50" },
  { name: "문화", icon: "🏛️", color: "#9C27B0" },
  { name: "음식", icon: "🍽️", color: "#FF9800" },
  { name: "쇼핑", icon: "🛍️", color: "#E91E63" },
  { name: "모험", icon: "🏄‍♂️", color: "#2196F3" },
  { name: "휴식", icon: "🏖️", color: "#00BCD4" },
  { name: "역사", icon: "🏰", color: "#795548" },
  { name: "축제", icon: "🎭", color: "#F44336" },
]

const PlanCreate: React.FC = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const isTablet = useMediaQuery(theme.breakpoints.between("md", "lg"))

  const [activeStep, setActiveStep] = useState(0)
  const [title, setTitle] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [companions, setCompanions] = useState([""])
  const [selectedThemes, setSelectedThemes] = useState<string[]>([])
  const [budget, setBudget] = useState<number>(500000)
  const [imageLoaded, setImageLoaded] = useState([false, false])

  // 이미지 프리로딩
  useEffect(() => {
    const preloadImages = () => {
      const nextStep = activeStep < steps.length - 1 ? activeStep + 1 : 0
      const images = steps[nextStep].images

      images.forEach((src) => {
        const img = new Image()
        img.src = src
      })
    }

    preloadImages()
  }, [activeStep])

  // 이미지 로드 상태 초기화
  useEffect(() => {
    setImageLoaded([false, false])
  }, [activeStep])

  const handleImageLoad = (index: number) => {
    setImageLoaded((prev) => {
      const newState = [...prev]
      newState[index] = true
      return newState
    })
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleCompanionChange = (index: number, value: string) => {
    const newCompanions = [...companions]
    newCompanions[index] = value
    setCompanions(newCompanions)
  }

  const addCompanion = () => {
    setCompanions([...companions, ""])
  }

  const removeCompanion = (index: number) => {
    const newCompanions = companions.filter((_, i) => i !== index)
    setCompanions(newCompanions)
  }

  const toggleTheme = (theme: string) => {
    setSelectedThemes((prevThemes) =>
      prevThemes.includes(theme) ? prevThemes.filter((t) => t !== theme) : [...prevThemes, theme],
    )
  }

  const handleSubmit = () => {
    // TODO: Implement form submission logic
    console.log({
      title,
      startDate,
      endDate,
      companions: companions.filter((c) => c.trim() !== ""),
      selectedThemes,
      budget,
    })
    navigate("/plans")
  }

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Fade in={activeStep === 0} timeout={800}>
            <Box>
              <Typography variant="h6" gutterBottom>
                {steps[0].description}
              </Typography>
              <TextField
                fullWidth
                label="여행 제목"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                margin="normal"
                variant="outlined"
                placeholder="예: 제주도 가족 여행, 유럽 배낭여행"
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  gap: 2,
                  mt: 2,
                }}
              >
                <FormControl fullWidth sx={{ width: isMobile ? "100%" : "50%" }}>
                  <InputLabel htmlFor="start-date" shrink>
                    시작일
                  </InputLabel>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                    <CalendarMonth sx={{ mr: 1, color: "text.secondary" }} />
                    <TextField
                      id="start-date"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  </Box>
                </FormControl>
                <FormControl fullWidth sx={{ width: isMobile ? "100%" : "50%" }}>
                  <InputLabel htmlFor="end-date" shrink>
                    종료일
                  </InputLabel>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                    <CalendarMonth sx={{ mr: 1, color: "text.secondary" }} />
                    <TextField
                      id="end-date"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  </Box>
                </FormControl>
              </Box>
            </Box>
          </Fade>
        )
      case 1:
        return (
          <Fade in={activeStep === 1} timeout={800}>
            <Box>
              <Typography variant="h6" gutterBottom>
                {steps[1].description}
              </Typography>
              {companions.map((companion, index) => (
                <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <TextField
                    fullWidth
                    label={`동행자 ${index + 1}`}
                    value={companion}
                    onChange={(e) => handleCompanionChange(index, e.target.value)}
                    placeholder="이름 또는 이메일"
                    variant="outlined"
                  />
                  {companions.length > 1 && (
                    <IconButton onClick={() => removeCompanion(index)} color="error" sx={{ ml: 1 }}>
                      <RemoveCircleOutline />
                    </IconButton>
                  )}
                </Box>
              ))}
              <Button startIcon={<AddCircleOutline />} onClick={addCompanion} variant="outlined" sx={{ mt: 2 }}>
                동행자 추가
              </Button>
            </Box>
          </Fade>
        )
      case 2:
        return (
          <Fade in={activeStep === 2} timeout={800}>
            <Box>
              <Typography variant="h6" gutterBottom>
                {steps[2].description}
              </Typography>
              <Grid container spacing={2}>
                {themes.map((theme) => (
                  <Grid item xs={6} sm={4} md={3} key={theme.name}>
                    <Paper
                      elevation={selectedThemes.includes(theme.name) ? 8 : 1}
                      sx={{
                        p: 2,
                        textAlign: "center",
                        cursor: "pointer",
                        transition: "all 0.3s",
                        transform: selectedThemes.includes(theme.name) ? "scale(1.05)" : "scale(1)",
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                        borderTop: selectedThemes.includes(theme.name) ? `4px solid ${theme.color}` : "none",
                      }}
                      onClick={() => toggleTheme(theme.name)}
                    >
                      <Typography variant="h4" component="div" gutterBottom>
                        {theme.icon}
                      </Typography>
                      <Typography variant="body1" fontWeight={selectedThemes.includes(theme.name) ? "bold" : "normal"}>
                        {theme.name}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Fade>
        )
      case 3:
        return (
          <Fade in={activeStep === 3} timeout={800}>
            <Box>
              <Typography variant="h6" gutterBottom>
                {steps[3].description}
              </Typography>
              <Box sx={{ px: 2, py: 4 }}>
                <Slider
                  value={budget}
                  onChange={(_, newValue) => setBudget(newValue as number)}
                  aria-labelledby="budget-slider"
                  valueLabelDisplay="on"
                  min={100000}
                  max={10000000}
                  step={100000}
                  marks={[
                    { value: 100000, label: "10만원" },
                    { value: 1000000, label: "100만원" },
                    { value: 5000000, label: "500만원" },
                    { value: 10000000, label: "1000만원" },
                  ]}
                  sx={{
                    "& .MuiSlider-valueLabel": {
                      backgroundColor: theme.palette.primary.main,
                    },
                  }}
                />
              </Box>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  mt: 3,
                  textAlign: "center",
                  backgroundColor: theme.palette.primary.main,
                  color: "white",
                }}
              >
                <Typography variant="h5" gutterBottom>
                  예상 예산
                </Typography>
                <Typography variant="h3" fontWeight="bold">
                  {budget.toLocaleString()}원
                </Typography>
              </Paper>
            </Box>
          </Fade>
        )
      default:
        return "Unknown step"
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 배경 이미지 (모바일에서는 표시하지 않음) */}
      {!isMobile && (
        <>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${steps[activeStep].images[0]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(8px)",
              transform: "scale(1.1)",
              zIndex: -1,
            }}
          />
          <Fade in={true} timeout={1000}>
            <Box
              sx={{
                flex: isTablet ? 0.4 : 1,
                position: "relative",
                overflow: "hidden",
                display: { xs: "none", md: "block" },
              }}
            >
              <Box
                component="img"
                src={steps[activeStep].images[0]}
                alt="Travel"
                onLoad={() => handleImageLoad(0)}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "opacity 0.5s ease-in-out",
                  opacity: imageLoaded[0] ? 1 : 0,
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
                  color: "white",
                  p: 3,
                }}
              >
                <Typography variant="h5" gutterBottom>
                  {steps[activeStep].label}
                </Typography>
                <Typography variant="body1">{steps[activeStep].description}</Typography>
              </Box>
            </Box>
          </Fade>
        </>
      )}

      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          py: 4,
          flex: isMobile ? 1 : isTablet ? 0.6 : 1,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, sm: 4 },
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            borderRadius: 2,
            position: "relative",
            zIndex: 1,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            align="center"
            sx={{
              mb: 4,
              fontWeight: "bold",
              color: theme.palette.primary.main,
            }}
          >
            새로운 여행 계획 만들기
          </Typography>

          <Stepper
            activeStep={activeStep}
            alternativeLabel={!isMobile}
            orientation={isMobile ? "vertical" : "horizontal"}
            sx={{ mb: 4 }}
          >
            {steps.map(({ label, icon }, index) => {
              const stepProps: { completed?: boolean } = {}
              const labelProps: { optional?: React.ReactNode } = {}
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel
                    {...labelProps}
                    StepIconComponent={() => (
                      <Avatar
                        sx={{
                          bgcolor: activeStep === index ? theme.palette.primary.main : "grey.400",
                          width: 32,
                          height: 32,
                        }}
                      >
                        {icon}
                      </Avatar>
                    )}
                  >
                    {label}
                  </StepLabel>
                </Step>
              )
            })}
          </Stepper>

          <Divider sx={{ mb: 4 }} />

          <Box sx={{ minHeight: "250px", mb: 4 }}>{getStepContent(activeStep)}</Box>

          <Divider sx={{ mb: 4 }} />

          <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
            <Button
              variant="outlined"
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              startIcon={<ArrowBack />}
              sx={{ px: 3 }}
            >
              이전
            </Button>

            <Typography variant="body2" color="text.secondary">
              {activeStep + 1} / {steps.length}
            </Typography>

            <Button
              variant="contained"
              onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
              endIcon={activeStep === steps.length - 1 ? undefined : <ArrowForward />}
              sx={{ px: 3 }}
            >
              {activeStep === steps.length - 1 ? "완료" : "다음"}
            </Button>
          </Stack>
        </Paper>
      </Container>

      {!isMobile && !isTablet && (
        <Fade in={true} timeout={1000}>
          <Box
            sx={{
              flex: 1,
              position: "relative",
              overflow: "hidden",
              display: { xs: "none", lg: "block" },
            }}
          >
            <Box
              component="img"
              src={steps[activeStep].images[1]}
              alt="Travel"
              onLoad={() => handleImageLoad(1)}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "opacity 0.5s ease-in-out",
                opacity: imageLoaded[1] ? 1 : 0,
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
                color: "white",
                p: 3,
              }}
            >
              <Typography variant="h5" gutterBottom>
                여행의 추억
              </Typography>
              <Typography variant="body1">소중한 사람들과 함께하는 특별한 순간</Typography>
            </Box>
          </Box>
        </Fade>
      )}
    </Box>
  )
}

export default PlanCreate

