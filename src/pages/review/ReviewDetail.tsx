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
  Divider,
  Button
} from '@mui/material';
import { LocationOn, CalendarToday, Edit, Delete } from '@mui/icons-material';
import PageContainer from '../../components/common/PageContainer';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import reviewApi, { ReviewDetailResponse } from '../../api/reviewApi';

const ReviewDetail: React.FC = () => {
  const { reviewId } = useParams<{ reviewId: string }>();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [review, setReview] = useState<ReviewDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviewDetail = async () => {
      if (!reviewId) return;
      
      try {
        setIsLoading(true);
        setError(null);
        const response = await reviewApi.getReviewDetail(reviewId);
        setReview(response.data);
      } catch (error: any) {
        console.error('Error fetching review detail:', error);
        setError(error.response?.data?.message || '후기 상세 정보를 불러오는 데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviewDetail();
  }, [reviewId]);

  const handleDeleteReview = async () => {
    if (!reviewId || !window.confirm('정말로 이 후기를 삭제하시겠습니까?')) return;
    
    try {
      await reviewApi.deleteReview(reviewId);
      navigate('/reviews');
    } catch (error: any) {
      console.error('Error deleting review:', error);
      alert('후기 삭제에 실패했습니다.');
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!review) return <ErrorMessage message="후기 정보를 찾을 수 없습니다." />;

  const isOwner = auth.userId === review.userId;

  return (
    <PageContainer>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">
          {review.title}
        </Typography>
        
        {isOwner && (
          <Box>
            <Button 
              startIcon={<Edit />} 
              size="small" 
              sx={{ mr: 1 }}
              onClick={() => navigate(`/reviews/edit/${reviewId}`)}
            >
              수정
            </Button>
            <Button 
              startIcon={<Delete />} 
              size="small" 
              color="error"
              onClick={handleDeleteReview}
            >
              삭제
            </Button>
          </Box>
        )}
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <CalendarToday fontSize="small" color="action" />
        <Typography variant="body2" color="text.secondary">
          {format(new Date(review.createdAt), 'yyyy.MM.dd')}
        </Typography>
      </Box>

      {review.images && review.images.length > 0 && (
        <ImageList cols={2} gap={8} sx={{ mb: 3 }}>
          {review.images.map((image, index) => (
            <ImageListItem key={index}>
              <img
                src={image}
                alt={`여행 사진 ${index + 1}`}
                loading="lazy"
                style={{ borderRadius: 8 }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      )}

      {review.location && Object.keys(review.location).length > 0 && (
        <Paper sx={{ p: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <LocationOn color="primary" />
            <Typography variant="subtitle1">
              주요 방문 장소
            </Typography>
          </Box>
          <Typography variant="body1">
            {review.location.name || review.location.place_name || Object.values(review.location).join(', ')}
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