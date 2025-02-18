// src/pages/review/ReviewList.tsx
import React from 'react';
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

const ReviewList: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const loadMore = () => {
    // TODO: 추가 데이터 로딩 구현
    console.log('Load more reviews');
  };

  const observerRef = useInfiniteScroll({
    onIntersect: loadMore,
    enabled: !isLoading
  });

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

      {/* TODO: API 연동 후 실제 데이터로 교체 */}
      <Card sx={{ mb: 2 }}>
        <CardActionArea onClick={() => navigate('/reviews/1')}>
          <CardMedia
            component="img"
            height="140"
            image="/images/placeholder.jpg"
            alt="여행 후기 이미지"
          />
          <CardContent>
            <Typography variant="h6" gutterBottom>
              제주도 3박 4일 여행 후기
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
              <Chip label="관광" size="small" />
              <Chip label="맛집" size="small" />
            </Box>
            <Typography variant="body2" color="text.secondary">
              {format(new Date('2024-02-20'), 'yyyy.MM.dd')}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

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