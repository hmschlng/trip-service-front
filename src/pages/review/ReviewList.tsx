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
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { format } from 'date-fns';
import { reviewApi } from '../../api';
import { ReviewResponse } from '../../api/reviewApi';
import { useSnackbar } from 'notistack';

const ReviewList: React.FC = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [reviews, setReviews] = useState<ReviewResponse[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        const userId = localStorage.getItem('userId');
        if (!userId) {
          enqueueSnackbar('로그인이 필요합니다.', { variant: 'warning' });
          navigate('/login');
          return;
        }
        
        const response = await reviewApi.getMyReviews(userId);
        setReviews(response.data.data || []);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        enqueueSnackbar('여행 후기를 불러오는데 실패했습니다.', { variant: 'error' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [navigate, enqueueSnackbar]);

  const loadMore = () => {
    // 페이지네이션 구현이 필요하다면 여기에 추가
    console.log('Load more reviews');
  };

  const observerRef = useInfiniteScroll({
    onIntersect: loadMore,
    enabled: !isLoading
  });

  const filteredReviews = reviews.filter(review => 
    review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    review.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageContainer>
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="후기 검색"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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
      ) : filteredReviews.length > 0 ? (
        filteredReviews.map((review) => (
          <Card sx={{ mb: 2 }} key={review.reviewId}>
            <CardActionArea onClick={() => navigate(`/reviews/${review.reviewId}`)}>
              <CardMedia
                component="img"
                height="140"
                image={review.imageUrls && review.imageUrls.length > 0 ? review.imageUrls[0] : '/images/placeholder.jpg'}
                alt="여행 후기 이미지"
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {review.title}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                  {review.locationInfo && Object.keys(review.locationInfo).map((key) => (
                    <Chip key={key} label={review.locationInfo[key]} size="small" />
                  ))}
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {review.createdAt ? format(new Date(review.createdAt), 'yyyy.MM.dd') : ''}
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

      {isLoading && <LoadingSpinner />}
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