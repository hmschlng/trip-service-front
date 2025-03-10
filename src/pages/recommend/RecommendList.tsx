// src/pages/recommend/RecommendList.tsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  Grid,
  Typography
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import PageContainer from '../../components/common/PageContainer';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { PlaceResponse, recommendApi } from '../../api';
import PlaceCard from '../../components/recommend/PlaceCard';
import { useSnackbar } from 'notistack';
import { extractResponseData, extractErrorMessage } from '../../utils/apiUtils';

const RecommendList: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [keyword, setKeyword] = useState('');
  const [searchedKeyword, setSearchedKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [places, setPlaces] = useState<PlaceResponse[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  
  const searchPlaces = async () => {
    if (!keyword.trim()) return;
    
    try {
      setIsLoading(true);
      setSearchedKeyword(keyword);
      const userId = localStorage.getItem('userId');
      
      const response = await recommendApi.getRecommendedPlaces(keyword, userId || undefined);
      setPlaces(response.data.data || []);
      setPage(0);
      setHasMore(true);
    } catch (error) {
      console.error('Search error:', error);
      enqueueSnackbar('여행지 검색에 실패했습니다.', { variant: 'error' });
} finally {
  setIsLoading(false);
}
};

const loadMore = async () => {
if (!searchedKeyword || !hasMore || isLoading) return;

try {
  setIsLoading(true);
  const nextPage = page + 1;
  const userId = localStorage.getItem('userId');
  
  const response = await recommendApi.getMoreRecommendedPlaces(
    searchedKeyword, 
    nextPage * 5, 
    5, 
    userId || undefined
  );
  
  const newPlaces = response.data.data || [];
  if (newPlaces.length === 0) {
    setHasMore(false);
  } else {
    setPlaces(prev => [...prev, ...newPlaces]);
    setPage(nextPage);
  }
} catch (error) {
  console.error('Load more error:', error);
  enqueueSnackbar('추가 여행지 로딩에 실패했습니다.', { variant: 'error' });
} finally {
  setIsLoading(false);
}
};

// 인기 키워드 및 추천 키워드 로딩
const [popularKeywords, setPopularKeywords] = useState<string[]>([]);
const [recommendedKeywords, setRecommendedKeywords] = useState<string[]>([]);

useEffect(() => {
  const fetchKeywords = async () => {
    try {
      const response = await recommendApi.getKeywords();
      const keywordsData = extractResponseData(response);
      setPopularKeywords(keywordsData.popularKeywords || []);
      setRecommendedKeywords(keywordsData.recommendedKeywords || []);
    } catch (error) {
      console.error('Fetch keywords error:', error);
    }
  };

fetchKeywords();
}, []);

const handleKeyPress = (e: React.KeyboardEvent) => {
if (e.key === 'Enter') {
  searchPlaces();
}
};

const observerRef = useInfiniteScroll({
onIntersect: loadMore,
enabled: !isLoading && hasMore && places.length > 0
});

return (
<PageContainer>
  <Box sx={{ mb: 3 }}>
    <TextField
      fullWidth
      placeholder="여행지 검색"
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
      onKeyPress={handleKeyPress}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  </Box>

  {!searchedKeyword && (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle1" gutterBottom>인기 검색어</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {popularKeywords.map((kw, index) => (
          <Box 
            key={index}
            sx={{ 
              px: 2, 
              py: 0.5, 
              bgcolor: 'primary.light', 
              color: 'white',
              borderRadius: 4,
              cursor: 'pointer'
            }}
            onClick={() => {
              setKeyword(kw);
              setSearchedKeyword(kw);
              searchPlaces();
            }}
          >
            {kw}
          </Box>
        ))}
      </Box>
      
      <Typography variant="subtitle1" sx={{ mt: 2 }} gutterBottom>추천 검색어</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {recommendedKeywords.map((kw, index) => (
          <Box 
            key={index}
            sx={{ 
              px: 2, 
              py: 0.5, 
              bgcolor: 'secondary.light', 
              color: 'white',
              borderRadius: 4,
              cursor: 'pointer'
            }}
            onClick={() => {
              setKeyword(kw);
              setSearchedKeyword(kw);
              searchPlaces();
            }}
          >
            {kw}
          </Box>
        ))}
      </Box>
    </Box>
  )}

  {searchedKeyword && (
    <Typography variant="subtitle1" gutterBottom>
      '{searchedKeyword}' 검색 결과
    </Typography>
  )}

  <Grid container spacing={2}>
    {places.map((place) => (
      <Grid item xs={12} sm={6} key={place.placeId}>
        <PlaceCard place={place} />
      </Grid>
    ))}
  </Grid>

  {isLoading && <LoadingSpinner />}
  {places.length === 0 && searchedKeyword && !isLoading && (
    <Typography variant="body1" sx={{ textAlign: 'center', my: 4 }}>
      검색 결과가 없습니다. 다른 키워드로 검색해보세요.
    </Typography>
  )}
  <div ref={observerRef} />
</PageContainer>
);
};

export default RecommendList;