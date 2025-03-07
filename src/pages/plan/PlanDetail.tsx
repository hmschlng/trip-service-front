// src/pages/plan/PlanDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Tab, Tabs } from '@mui/material';
import PageContainer from '../../components/common/PageContainer';
import PlanDetail from '../../components/plan/PlanDetail';
import PlanTimeline from '../../components/plan/PlanTimeline';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import { useAuth } from '../../hooks/useAuth';
import planApi, { PlanDetailResponse } from '../../api/planApi';

const PlanDetailPage: React.FC = () => {
  const { planId } = useParams<{ planId: string }>();
  const { auth } = useAuth();
  const [plan, setPlan] = useState<PlanDetailResponse | null>(null);
  const [value, setValue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlanDetail = async () => {
      if (!planId || !auth.userId) return;
      
      try {
        setIsLoading(true);
        setError(null);
        const response = await planApi.getPlanDetail(planId, auth.userId);
        setPlan(response.data);
      } catch (error: any) {
        console.error('Error fetching plan details:', error);
        setError(error.response?.data?.message || '여행 플랜 상세 정보를 불러오는 데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlanDetail();
  }, [planId, auth.userId]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!plan) return <ErrorMessage message="여행 플랜 정보를 찾을 수 없습니다." />;

  return (
    <PageContainer>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={value} onChange={(_, newValue) => setValue(newValue)}>
          <Tab label="기본 정보" />
          <Tab label="타임라인" />
        </Tabs>
      </Box>

      {value === 0 && (
        <PlanDetail
          title={plan.title}
          startDate={plan.startDate}
          endDate={plan.endDate}
          companions={plan.companions}
          themes={plan.themes}
          estimatedBudget={plan.estimatedBudget}
          onEditClick={() => console.log('Edit clicked')}
        />
      )}

      {value === 1 && (
        <PlanTimeline
          items={(plan.timeline || []).map(item => ({
            date: `${plan.startDate}`, // 또는 적절한 날짜 계산 로직
            time: item.time || '',
            activity: item.activity || '',
            location: item.location || ''
          }))}
        />
      )}
    </PageContainer>
  );
};

export default PlanDetailPage;