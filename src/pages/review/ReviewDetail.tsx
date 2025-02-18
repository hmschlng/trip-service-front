// src/pages/review/ReviewDetail.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  ImageList,
  ImageListItem,
  Chip,
  Paper,
  Divider
} from '@mui/material';
import { LocationOn, CalendarToday } from '@mui/icons-material';
import PageContainer from '../../components/common/PageContainer';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import { format } from 'date-fns';

const ReviewDetail: React.FC = () => {
  const { reviewId } = useParams<{ reviewId: string }>();
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    // TODO: API 연동
    setIsLoading(false);
  }, [reviewId]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <PageContainer>
      <Typography variant="h5" gutterBottom>
        제주도 3박 4일 여행 후기
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <CalendarToday fontSize="small" color="action" />
        <Typography variant="body2" color="text.secondary">
          {format(new Date('2024-02-20'), 'yyyy.MM.dd')}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
        <Chip label="관광" size="small" />
        <Chip label="맛집" size="small" />
      </Box>

      <ImageList cols={2} gap={8} sx={{ mb: 3 }}>
        {[1, 2, 3, 4].map((item) => (
          <ImageListItem key={item}>
            <img
              src={`/images/placeholder.jpg`}
              alt={`여행 사진 ${item}`}
              loading="lazy"
              style={{ borderRadius: 8 }}
            />
          </ImageListItem>
        ))}
      </ImageList>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <LocationOn color="primary" />
          <Typography variant="subtitle1">
            주요 방문 장소
          </Typography>
        </Box>
        <Typography variant="body1">
          성산일출봉, 우도, 만장굴, 한라산
        </Typography>
      </Paper>

      <Divider sx={{ mb: 3 }} />

      <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
        {`제주도의 아름다운 자연을 만끽할 수 있었던 여행이었습니다.
        특히 성산일출봉에서 본 일출은 정말 인상적이었어요.
        우도에서는 전기자전거를 타고 섬을 한 바퀴 돌았는데,
        바다 풍경이 너무 예뻤습니다.
        
        먹거리도 훌륭했어요.
        흑돼지 구이, 해산물 요리, 오메기떡 등
        제주도의 맛있는 음식들을 실컷 먹었습니다.`}
      </Typography>
    </PageContainer>
  );
};

export default ReviewDetail;