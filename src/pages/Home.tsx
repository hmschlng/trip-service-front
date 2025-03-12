"use client"

import type React from "react"
import { useNavigate } from "react-router-dom"
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Divider,
  useTheme,
  useMediaQuery,
  Avatar,
  CardActionArea,
} from "@mui/material"
import {
  Map as MapIcon,
  Explore as ExploreIcon,
  RateReview as ReviewIcon,
  Flight,
  Hotel,
  DirectionsWalk,
  Restaurant,
  PhotoCamera,
  Favorite,
  Star,
  LocationOn,
} from "@mui/icons-material"

const Home: React.FC = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))

  // 여행 목적지 데이터
  const destinations = [
    {
      id: 1,
      name: "제주도",
      image: "https://images.unsplash.com/photo-1601455763557-db1bea8a9a5a?q=80&w=1200",
      description: "아름다운 자연과 독특한 문화가 어우러진 한국의 보물섬",
      rating: 4.8,
    },
    {
      id: 2,
      name: "부산",
      image: "https://images.unsplash.com/photo-1578338469567-d65f7ccc68e1?q=80&w=1200",
      description: "해변과 산이 공존하는 한국 제2의 도시",
      rating: 4.7,
    },
    {
      id: 3,
      name: "경주",
      image: "https://images.unsplash.com/photo-1625473828382-8b2c4615e962?q=80&w=1200",
      description: "천년 역사의 숨결을 느낄 수 있는 야외 박물관",
      rating: 4.6,
    },
    {
      id: 4,
      name: "서울",
      image: "https://images.unsplash.com/photo-1538485399081-7191377e8241?q=80&w=1200",
      description: "전통과 현대가 공존하는 대한민국의 수도",
      rating: 4.9,
    },
  ]

  // 여행 후기 데이터
  const reviews = [
    {
      id: 1,
      title: "제주도에서의 잊지 못할 추억",
      location: "제주도",
      author: "김여행",
      avatar: "https://i.pravatar.cc/150?img=1",
      date: "2023-05-15",
      content:
        "제주도의 아름다운 해변과 오름을 탐험하며 특별한 시간을 보냈습니다. 특히 성산일출봉에서 본 일출은 정말 환상적이었어요!",
    },
    {
      id: 2,
      title: "부산 여행의 즐거움",
      location: "부산",
      author: "이탐험",
      avatar: "https://i.pravatar.cc/150?img=2",
      date: "2023-06-22",
      content:
        "해운대와 광안리 해변에서의 시간, 그리고 부산의 맛있는 해산물까지! 가족과 함께한 부산 여행은 정말 행복했습니다.",
    },
  ]

  return (
    <Box sx={{ pb: 8 }}>
      {/* 히어로 섹션 */}
      <Box
        sx={{
          position: "relative",
          height: { xs: "60vh", md: "70vh" },
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          mb: 6,
        }}
      >
        {/* 배경 이미지 */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -1,
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.4)",
              zIndex: 1,
            },
          }}
        >
          <Box
            component="img"
            src="https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1920"
            alt="여행 배경"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>

        {/* 히어로 콘텐츠 */}
        <Container maxWidth="lg">
          <Box
            sx={{
              color: "white",
              position: "relative",
              zIndex: 2,
              textAlign: { xs: "center", md: "left" },
              maxWidth: { md: "60%" },
            }}
          >
            <Typography
              variant="h2"
              component="h1"
              fontWeight="bold"
              sx={{
                mb: 2,
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              당신만의 특별한 여행을 시작하세요
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                opacity: 0.9,
                textShadow: "0 1px 2px rgba(0,0,0,0.3)",
              }}
            >
              계획부터 후기까지, 모든 여행의 순간을 함께합니다
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/plans/new")}
                startIcon={<MapIcon />}
                sx={{
                  py: 1.5,
                  px: 3,
                  borderRadius: 2,
                  fontSize: "1rem",
                  fontWeight: 600,
                  boxShadow: "0 4px 14px rgba(0,0,0,0.3)",
                  background: "linear-gradient(45deg, #3B82F6 30%, #60A5FA 90%)",
                }}
              >
                여행 계획 만들기
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate("/recommendations")}
                startIcon={<ExploreIcon />}
                sx={{
                  py: 1.5,
                  px: 3,
                  borderRadius: 2,
                  fontSize: "1rem",
                  fontWeight: 600,
                  borderColor: "white",
                  color: "white",
                  "&:hover": {
                    borderColor: "white",
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                여행지 추천 받기
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* 주요 기능 섹션 */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h3" component="h2" fontWeight="bold" color="primary" sx={{ mb: 2 }}>
            여행의 모든 순간
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: "auto" }}>
            계획부터 후기까지, 여행의 모든 과정을 더 특별하게 만들어 드립니다
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              component={Card}
              sx={{
                height: "100%",
                borderRadius: 4,
                textAlign: "center",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                },
              }}
            >
              <CardActionArea
                onClick={() => navigate("/plans/new")}
                sx={{ p: 4, height: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    bgcolor: "primary.light",
                    color: "white",
                    mx: "auto",
                    mb: 3,
                  }}
                >
                  <MapIcon sx={{ fontSize: 40 }} />
                </Box>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  맞춤형 여행 계획
                </Typography>
                <Typography color="text.secondary">
                  일정, 예산, 취향에 맞는 최적의 여행 계획을 손쉽게 만들어보세요. 동행자와 함께 계획을 공유하고 수정할
                  수 있습니다.
                </Typography>
              </CardActionArea>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              component={Card}
              sx={{
                height: "100%",
                borderRadius: 4,
                textAlign: "center",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                },
              }}
            >
              <CardActionArea
                onClick={() => navigate("/recommendations")}
                sx={{ p: 4, height: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    bgcolor: "primary.light",
                    color: "white",
                    mx: "auto",
                    mb: 3,
                  }}
                >
                  <ExploreIcon sx={{ fontSize: 40 }} />
                </Box>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  AI 여행지 추천
                </Typography>
                <Typography color="text.secondary">
                  인공지능이 분석한 맞춤형 여행지 추천을 받아보세요. 취향, 시즌, 날씨 등을 고려한 최적의 목적지를 발견할
                  수 있습니다.
                </Typography>
              </CardActionArea>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              component={Card}
              sx={{
                height: "100%",
                borderRadius: 4,
                textAlign: "center",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                },
              }}
            >
              <CardActionArea
                onClick={() => navigate("/reviews")}
                sx={{ p: 4, height: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    bgcolor: "primary.light",
                    color: "white",
                    mx: "auto",
                    mb: 3,
                  }}
                >
                  <ReviewIcon sx={{ fontSize: 40 }} />
                </Box>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  여행 후기 공유
                </Typography>
                <Typography color="text.secondary">
                  특별했던 여행의 순간을 기록하고 다른 여행자들과 공유해보세요. 사진, 팁, 추천 장소 등을 포함한 나만의
                  여행 이야기를 만들 수 있습니다.
                </Typography>
              </CardActionArea>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* 인기 여행지 섹션 */}
      <Box sx={{ bgcolor: "#f8fafc", py: 8, mb: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography variant="h3" component="h2" fontWeight="bold" color="primary" sx={{ mb: 2 }}>
              인기 여행지
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: "auto" }}>
              다른 여행자들이 사랑하는 인기 여행지를 만나보세요
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {destinations.map((destination) => (
              <Grid item xs={12} sm={6} md={3} key={destination.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 3,
                    overflow: "hidden",
                    boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 12px 20px rgba(0,0,0,0.12)",
                    },
                  }}
                >
                  <Box sx={{ position: "relative" }}>
                    <CardMedia component="img" height="200" image={destination.image} alt={destination.name} />
                    <Box
                      sx={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        bgcolor: "rgba(0,0,0,0.6)",
                        color: "white",
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Star sx={{ fontSize: 16, color: "#FFD700", mr: 0.5 }} />
                      <Typography variant="body2" fontWeight="bold">
                        {destination.rating}
                      </Typography>
                    </Box>
                  </Box>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {destination.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {destination.description}
                    </Typography>
                  </CardContent>
                  <Box
                    sx={{
                      p: 2,
                      pt: 0,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <LocationOn fontSize="small" color="primary" sx={{ mr: 0.5 }} />
                      <Typography variant="body2" color="primary">
                        {destination.name}
                      </Typography>
                    </Box>
                    <Button size="small" onClick={() => navigate(`/recommendations?keyword=${destination.name}`)}>
                      자세히 보기
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/recommendations")}
              endIcon={<ExploreIcon />}
              sx={{
                borderRadius: 2,
                px: 4,
                py: 1.2,
              }}
            >
              더 많은 여행지 보기
            </Button>
          </Box>
        </Container>
      </Box>

      {/* 여행 후기 섹션 */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h3" component="h2" fontWeight="bold" color="primary" sx={{ mb: 2 }}>
            여행 후기
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: "auto" }}>
            다른 여행자들의 생생한 경험담을 통해 영감을 얻어보세요
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {reviews.map((review) => (
            <Grid item xs={12} md={6} key={review.id}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
                  height: "100%",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar src={review.avatar} alt={review.author} sx={{ mr: 2 }} />
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {review.author}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {review.date}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {review.title}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <LocationOn fontSize="small" color="primary" sx={{ mr: 0.5 }} />
                  <Typography variant="body2" color="primary">
                    {review.location}
                  </Typography>
                </Box>
                <Typography variant="body1" paragraph>
                  {review.content}
                </Typography>
                <Button size="small" onClick={() => navigate("/reviews")} sx={{ mt: 1 }}>
                  더 읽기
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate("/reviews")}
            endIcon={<ReviewIcon />}
            sx={{
              borderRadius: 2,
              px: 4,
              py: 1.2,
            }}
          >
            모든 후기 보기
          </Button>
        </Box>
      </Container>

      {/* CTA 섹션 */}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          py: 8,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* 배경 패턴 */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="%23ffffff" fillOpacity="1" fillRule="evenodd"/%3E%3C/svg%3E")',
          }}
        />

        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h3" component="h2" fontWeight="bold" sx={{ mb: 3 }}>
              지금 바로 여행을 시작하세요
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              나만의 특별한 여행 이야기를 만들어보세요
            </Typography>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              onClick={() => navigate("/plans/new")}
              sx={{
                py: 1.5,
                px: 4,
                borderRadius: 2,
                fontSize: "1.1rem",
                fontWeight: 600,
                bgcolor: "white",
                color: "primary.main",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.9)",
                },
              }}
            >
              여행 계획 만들기
            </Button>
          </Box>
        </Container>
      </Box>

      {/* 여행 활동 아이콘 섹션 */}
      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Divider sx={{ mb: 6 }}>
          <Typography variant="h5" color="text.secondary" fontWeight="medium">
            다양한 여행 활동
          </Typography>
        </Divider>

        <Grid container spacing={3} justifyContent="center">
          {[
            { icon: <Flight />, label: "항공" },
            { icon: <Hotel />, label: "숙박" },
            { icon: <DirectionsWalk />, label: "관광" },
            { icon: <Restaurant />, label: "맛집" },
            { icon: <PhotoCamera />, label: "사진" },
            { icon: <Favorite />, label: "추억" },
          ].map((item, index) => (
            <Grid item xs={4} sm={2} key={index}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    bgcolor: "primary.light",
                    color: "white",
                    mb: 1,
                  }}
                >
                  {item.icon}
                </Box>
                <Typography variant="body1">{item.label}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default Home

