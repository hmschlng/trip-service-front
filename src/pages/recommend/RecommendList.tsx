// src/pages/recommend/RecommendList.tsx
import React from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Chip
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../../components/common/PageContainer';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';

interface PlaceCard {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  matchingRate: number;
}

const RecommendList: React.FC = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  
  // TODO: API 연동 후 실제 데이터로 교체
  const places: PlaceCard[] = [
    {
      id: '1',
      name: '제주 성산일출봉',
      description: '유네스코 세계자연유산으로 등재된 제주의 대표 관광지',
      imageUrl: '/images/placeholder.jpg',
      matchingRate: 98
    }
  ];

  const loadMore = () => {
    // TODO: 추가 데이터 로딩 구현
    console.log('Load more places');
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
          placeholder="여행지 검색"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Grid container spacing={2}>
        {places.map((place) => (
          <Grid item xs={12} sm={6} key={place.id}>
            <Card>
              <CardActionArea onClick={() => navigate(`/recommendations/${place.id}`)}>
                <CardMedia
                  component="img"
                  height="140"
                  image={place.imageUrl}
                  alt={place.name}
                />
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h6" component="div">
                      {place.name}
                    </Typography>
                    <Chip
                      label={`${place.matchingRate}% 일치`}
                      color="primary"
                      size="small"
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {place.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {isLoading && <LoadingSpinner />}
      <div ref={observerRef} />
    </PageContainer>
  );
};

export default RecommendList;