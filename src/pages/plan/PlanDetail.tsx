// src/pages/plan/PlanDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import PageContainer from '../../components/common/PageContainer';
import PlanDetail from '../../components/plan/PlanDetail';
import PlanTimeline from '../../components/plan/PlanTimeline';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import { useAuth } from '../../hooks/useAuth';
import planApi, { PlanResponse } from '../../api/planApi';
import { extractResponseData, extractErrorMessage } from '../../utils/apiUtils';

const PlanDetailPage: React.FC = () => {
  const { planId } = useParams<{ planId: string }>();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [value, setValue] = React.useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [plan, setPlan] = useState<PlanResponse | null>(null);

  useEffect(() => {
    const fetchPlanDetail = async () => {
      if (!planId || !auth.userId) return;
      
      try {
        setIsLoading(true);
        setError(null);
        const response = await planApi.getPlan(planId, auth.userId);
        setPlan(extractResponseData(response));
      } catch (error: any) {
        console.error('Error fetching plan details:', error);
        setError(extractErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlanDetail();
  }, [planId, auth.userId]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!plan) return <ErrorMessage message="여행 플랜 정보가 없습니다." />;

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
          companions={plan.companions || []}
          themes={plan.themes || []}
          estimatedBudget={Number(plan.estimatedBudget) || 0}
          onEditClick={() => navigate(`/plans/edit/${planId}`)}
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