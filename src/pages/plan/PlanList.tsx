// src/pages/plan/PlanList.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Fab,
  TextField,
  InputAdornment,
  CircularProgress
} from '@mui/material';
import { Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';
import PageContainer from '../../components/common/PageContainer';
import PlanListItem from '../../components/plan/PlanListItem';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import { useAuth } from '../../hooks/useAuth';
import planApi, { PlanResponse } from '../../api/planApi';
import { extractResponseData, extractErrorMessage } from '../../utils/apiUtils';

const PlanList: React.FC = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [plans, setPlans] = useState<PlanResponse[]>([]);

  useEffect(() => {
    const fetchPlans = async () => {
      if (!auth.userId) return;
      
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await planApi.getMyPlans(auth.userId);
        setPlans(extractResponseData(response));
      } catch (error: any) {
        console.error('Error fetching plans:', error);
        setError(extractErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlans();
  }, [auth.userId]);

  const loadMore = () => {
    // 페이지네이션 구현이 필요하다면 여기에 추가
    console.log('Load more plans');
  };

  const observerRef = useInfiniteScroll({
    onIntersect: loadMore,
    enabled: !isLoading
  });

  const filteredPlans = plans.filter(plan => 
    plan.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageContainer>
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          placeholder="여행 제목 검색"
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

      <Box sx={{ mb: 8 }}>
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : filteredPlans.length > 0 ? (
          filteredPlans.map((plan) => (
            <PlanListItem
              key={plan.planId}
              planId={plan.planId}
              title={plan.title}
              startDate={plan.startDate}
              endDate={plan.endDate}
              themes={plan.themes || []}
              createdAt={plan.createdAt}
            />
          ))
        ) : (
          <Typography variant="body1" sx={{ textAlign: 'center', my: 4 }}>
            여행 플랜이 없습니다. 새로운 여행을 계획해보세요!
          </Typography>
        )}
      </Box>

      {isLoading && <LoadingSpinner />}
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