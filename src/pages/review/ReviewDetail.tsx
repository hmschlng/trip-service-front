// src/pages/review/ReviewDetail.tsx
import React, { useEffect, useState } from 'react';
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
import { reviewApi } from '../../api';
import { ReviewResponse } from '../../api/reviewApi';
import { useSnackbar } from 'notistack';

const ReviewDetail: React.FC = () => {
  const { reviewId } = useParams<{ reviewId: string }>();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [review, setReview] = useState<ReviewResponse | null>(null);

  useEffect(() => {
    const fetchReviewDetail = async () => {
      if (!reviewId) return;
      
      try {
        setIsLoading(true);
        const response = await reviewApi.getReview(reviewId);
        setReview(response.data.data);
      } catch (error) {
        console.error('Error fetching review details:', error);
        setError('여행 후기를 불러오는데 실패했습니다.');
        enqueueSnackbar('여행 후기를 불러오는데 실패했습니다.', { variant: 'error' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviewDetail();
  }, [reviewId, enqueueSnackbar]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!review) return <ErrorMessage message="여행 후기 정보가 없습니다." />;

  return (
    <PageContainer>
      <Typography variant="h5" gutterBottom>
        {review.title}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <CalendarToday fontSize="small" color="action" />
        <Typography variant="body2" color="text.secondary">
          {review.createdAt ? format(new Date(review.createdAt), 'yyyy.MM.dd') : ''}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
        {review.locationInfo && Object.entries(review.locationInfo).map(([key, value]) => (
          <Chip key={key} label={value} size="small" />
        ))}
      </Box>

      {review.imageUrls && review.imageUrls.length > 0 && (
        <ImageList cols={2} gap={8} sx={{ mb: 3 }}>
          {review.imageUrls.map((imageUrl, index) => (
            <ImageListItem key={index}>
              <img
                src={imageUrl}
                alt={`여행 사진 ${index + 1}`}
                loading="lazy"
                style={{ borderRadius: 8 }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      )}

      {review.locationInfo && review.locationInfo.name && (
        <Paper sx={{ p: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <LocationOn color="primary" />
            <Typography variant="subtitle1">
              주요 방문 장소
            </Typography>
          </Box>
          <Typography variant="body1">
            {review.locationInfo.name}
          </Typography>
        </Paper>
      )}

      <Divider sx={{ mb: 3 }} />

      <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
        {review.content}
      </Typography>
    </PageContainer>
  );
};

export default ReviewDetail;