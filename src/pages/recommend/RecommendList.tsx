// src/pages/recommend/RecommendList.tsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  Button
} from '@mui/material';
import PageContainer from '../../components/common/PageContainer';
import KeywordSearch from '../../components/recommend/KeywordSearch';
import CategoryFilter from '../../components/recommend/CategoryFilter';
import PlaceCard from '../../components/recommend/PlaceCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { useAuth } from '../../hooks/useAuth';
import recommendApi, { PlaceListResponse } from '../../api/recommendApi';

const RecommendList: React.FC = () => {
  const { auth } = useAuth();
  const [keyword, setKeyword] = useState('');
  const [places, setPlaces] = useState<PlaceListResponse[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const limit = 5;

  useEffect(() => {
    if (keyword) {
      searchPlaces(keyword);
    }
  }, [selectedCategories]);

  const searchPlaces = async (searchKeyword: string) => {
    try {
      setIsLoading(true);
      setError(null);
      setKeyword(searchKeyword);
      setOffset(0);
      
      const response = await recommendApi.getRecommendedPlaces(searchKeyword, auth.userId || undefined);
      
      // 카테고리 필터링 적용 (필요한 경우)
      let filteredPlaces = response;
      if (selectedCategories.length > 0) {
        filteredPlaces = response.filter(place => 
          selectedCategories.includes(place.category)
        );
      }
      
      setPlaces(filteredPlaces);
    } catch (error: any) {
      console.error('Error searching places:', error);
      setError(error.response?.data?.message || '추천 여행지를 불러오는 데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadMorePlaces = async () => {
    if (isLoadingMore || !keyword) return;
    
    try {
      setIsLoadingMore(true);
      const newOffset = offset + limit;
      
      const response = await recommendApi.getMoreRecommendedPlaces(
        keyword, 
        newOffset, 
        limit, 
        auth.userId || undefined
      );
      
      // 카테고리 필터링 적용 (필요한 경우)
      let filteredPlaces = response;
      if (selectedCategories.length > 0) {
        filteredPlaces = response.filter(place => 
          selectedCategories.includes(place.category)
        );
      }
      
      setPlaces(prev => [...prev, ...filteredPlaces]);
      setOffset(newOffset);
    } catch (error: any) {
      console.error('Error loading more places:', error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const observerRef = useInfiniteScroll({
    onIntersect: loadMorePlaces,
    enabled: !isLoadingMore && places.length > 0
  });

  return (
    <PageContainer>
      <Box sx={{ mb: 3 }}>
        <KeywordSearch onSearch={searchPlaces} />
      </Box>

      {keyword && (
        <CategoryFilter
          selectedCategories={selectedCategories}
          onSelectCategory={handleCategorySelect}
        />
      )}

      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : places.length > 0 ? (
        <>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {places.map((place) => (
              <Grid item xs={12} sm={6} key={place.placeId}>
                <PlaceCard place={place} />
              </Grid>
            ))}
          </Grid>
          
          {isLoadingMore && <Box sx={{ textAlign: 'center', my: 2 }}><CircularProgress /></Box>}
          <div ref={observerRef} />
          
          {places.length >= 5 && !isLoadingMore && (
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Button
                variant="outlined"
                onClick={loadMorePlaces}
              >
                더 보기
              </Button>
            </Box>
          )}
        </>
      ) : keyword ? (
        <Typography variant="body1" sx={{ textAlign: 'center', my: 4 }}>
          검색 결과가 없습니다. 다른 키워드로 검색해보세요.
        </Typography>
      ) : null}
    </PageContainer>
  );
};

export default RecommendList;