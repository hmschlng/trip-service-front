// src/pages/review/ReviewList.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  InputAdornment,
  Fab,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Chip
} from '@mui/material';
import { Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';
import PageContainer from '../../components/common/PageContainer';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { format } from 'date-fns';
import { useAuth } from '../../hooks/useAuth';
import reviewApi, { ReviewListResponse } from '../../api/reviewApi';

const ReviewList: React.FC = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [reviews, setReviews] = useState<ReviewListResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!auth.userId) return;
      
      try {
        setIsLoading(true);
        setError(null);
        const response = await reviewApi.getMyReviews(auth.userId);
        setReviews(response.data);
      } catch (error: any) {
        console.error('Error fetching reviews:', error);
        setError(error.response?.data?.message || '후기 목록을 불러오는 데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [auth.userId]);

  const handleSearch = () => {
    // TODO: 검색 기능 구현
    console.log('Search for:', searchQuery);
  };

  const loadMore = () => {
    // TODO: 무한 스크롤 또는 페이지네이션 구현
  };

  const observerRef = useInfiniteScroll({
    onIntersect: loadMore,
    enabled: !isLoading
  });

  if (error) return <ErrorMessage message={error} />;

  return (
    <PageContainer>
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="후기 검색"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {isLoading ? (
        <LoadingSpinner />
      ) : reviews.length > 0 ? (
        reviews.map((review) => (
          <Card sx={{ mb: 2 }} key={review.reviewId}>
            <CardActionArea onClick={() => navigate(`/reviews/${review.reviewId}`)}>
              <CardMedia
                component="img"
                height="140"
                image="/images/placeholder.jpg"
                alt="여행 후기 이미지"
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {review.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {format(new Date(review.createdAt), 'yyyy.MM.dd')}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))
      ) : (
        <Typography variant="body1" sx={{ textAlign: 'center', my: 4 }}>
          작성한 여행 후기가 없습니다. 새로운 후기를 작성해보세요!
        </Typography>
      )}

      <div ref={observerRef} />

      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', bottom: 72, right: 16 }}
        onClick={() => navigate('/reviews/new')}
      >
        <AddIcon />
      </Fab>
    </PageContainer>
  );
};

export default ReviewList;