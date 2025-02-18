// src/pages/plan/PlanList.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Fab,
  TextField,
  InputAdornment
} from '@mui/material';
import { Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';
import PageContainer from '../../components/common/PageContainer';
import PlanListItem from '../../components/plan/PlanListItem';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const PlanList: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  // TODO: API 연동
  const loadMore = () => {
    console.log('Load more plans');
  };

  const observerRef = useInfiniteScroll({
    onIntersect: loadMore,
    enabled: !isLoading
  });

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
        {/* TODO: API 연동 후 실제 데이터로 교체 */}
        <PlanListItem
          planId="1"
          title="제주도 여행"
          startDate="2024-03-01"
          endDate="2024-03-03"
          themes={['관광', '맛집']}
          createdAt="2024-02-20"
        />
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