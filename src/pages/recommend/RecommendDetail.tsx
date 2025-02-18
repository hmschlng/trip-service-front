// src/pages/recommend/RecommendDetail.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Card,
  CardMedia,
  Typography,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper
} from '@mui/material';
import {
  Today as TodayIcon,
  WbSunny as WeatherIcon,
  LocalActivity as ActivityIcon
} from '@mui/icons-material';
import PageContainer from '../../components/common/PageContainer';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';

const RecommendDetail: React.FC = () => {
  const { placeId } = useParams<{ placeId: string }>();
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    // TODO: API 연동
    setIsLoading(false);
  }, [placeId]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <PageContainer>
      <Card sx={{ mb: 3 }}>
        <CardMedia
          component="img"
          height="200"
          image="/images/placeholder.jpg"
          alt="장소 이미지"
        />
      </Card>

      <Typography variant="h5" gutterBottom>
        제주 성산일출봉
      </Typography>

      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <Chip label="자연경관" size="small" />
        <Chip label="UNESCO 유산" size="small" />
      </Box>

      <Typography variant="body1" sx={{ mb: 3 }}>
        유네스코 세계자연유산으로 등재된 제주의 대표 관광지로,
        수십만 년 전 화산활동으로 형성된 독특한 지형을 자랑합니다.
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <List>
          <ListItem>
            <ListItemIcon>
              <TodayIcon />
            </ListItemIcon>
            <ListItemText
              primary="추천 방문 시기"
              secondary="3월 ~ 5월"
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemIcon>
              <WeatherIcon />
            </ListItemIcon>
            <ListItemText
              primary="현재 날씨"
              secondary="맑음, 22°C"
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemIcon>
              <ActivityIcon />
            </ListItemIcon>
            <ListItemText
              primary="추천 활동"
              secondary="일출 감상, 등산, 사진 촬영"
            />
          </ListItem>
        </List>
      </Paper>

      <Typography variant="h6" gutterBottom>
        주변 관광 포인트
      </Typography>
      <Paper sx={{ p: 2 }}>
        <List>
          <ListItem>
            <ListItemText
              primary="우도"
              secondary="페리로 15분 거리의 섬"
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="섭지코지"
              secondary="차로 10분 거리의 해안가"
            />
          </ListItem>
        </List>
      </Paper>
    </PageContainer>
  );
};

export default RecommendDetail;