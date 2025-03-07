// src/pages/plan/PlanList.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Fab,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';
import PageContainer from '../../components/common/PageContainer';
import PlanListItem from '../../components/plan/PlanListItem';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import { useAuth } from '../../hooks/useAuth';
import planApi, { PlanListResponse } from '../../api/planApi';

const PlanList: React.FC = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [plans, setPlans] = useState<PlanListResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setIsLoading(true);
        setError(null);
        if (auth.userId) {
          const response = await planApi.getMyPlans(auth.userId);
          setPlans(response.data);
        }
      } catch (error: any) {
        console.error('Error fetching plans:', error);
        setError(error.response?.data?.message || '여행 플랜을 불러오는 데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlans();
  }, [auth.userId]);

  // TODO: 검색 기능 구현
  const handleSearch = () => {
    console.log('Search for:', searchQuery);
  };

  // 무한 스크롤 구현 (향후 페이지네이션 구현 시)
  const loadMore = () => {
    // 페이지네이션 또는 무한 스크롤 구현
  };

  const observerRef = useInfiniteScroll({
    onIntersect: loadMore,
    enabled: !isLoading
  });

  if (error) return <ErrorMessage message={error} />;

  return (
    <PageContainer>
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          placeholder="여행 제목 검색"
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

      <Box sx={{ mb: 8 }}>
        {isLoading ? (
          <LoadingSpinner />
        ) : plans.length > 0 ? (
          plans.map((plan) => (
            <PlanListItem
              key={plan.planId}
              planId={plan.planId}
              title={plan.title}
              startDate={plan.startDate}
              endDate={plan.endDate}
              themes={plan.themes}
              createdAt={plan.createdAt}
            />
          ))
        ) : (
          <Typography variant="body1" sx={{ textAlign: 'center', my: 4 }}>
            여행 플랜이 없습니다. 새로운 여행을 계획해보세요!
          </Typography>
        )}
      </Box>

      <div ref={observerRef} />

      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', bottom: 72, right: 16 }}
        onClick={() => navigate('/plans/new')}
      >
        <AddIcon />
      </Fab>
    </PageContainer>
  );
};

export default PlanList;