// src/pages/plan/PlanEdit.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import PageContainer from '../../components/common/PageContainer';
import PlanForm from '../../components/plan/PlanForm';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import { useAuth } from '../../hooks/useAuth';
import planApi from '../../api/planApi';
import { useSnackbar } from 'notistack';

interface PlanFormInputs {
  title: string;
  startDate: string;
  endDate: string;
  companions: string[];
  themes: string[];
  estimatedBudget: number;
}

const PlanEdit: React.FC = () => {
  const { planId } = useParams<{ planId: string }>();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [plan, setPlan] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlanDetail = async () => {
      if (!planId || !auth.userId) return;

      try {
        setIsLoading(true);
        const response = await planApi.getPlan(planId, auth.userId);
        setPlan(response.data.data);
      } catch (error: any) {
        console.error('Error fetching plan details:', error);
        setError(error.response?.data?.message || '여행 플랜을 불러오는데 실패했습니다.');
        enqueueSnackbar('여행 플랜을 불러오는데 실패했습니다.', { variant: 'error' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlanDetail();
  }, [planId, auth.userId, enqueueSnackbar]);

  const handleUpdatePlan = async (formData: any) => {
    if (!planId) return;

    try {
      setIsLoading(true);
      const userId = localStorage.getItem('userId');
      if (!userId) {
        enqueueSnackbar('로그인이 필요합니다.', { variant: 'warning' });
        navigate('/login');
        return;
      }

      await planApi.updatePlan(planId, {
        ...formData,
        userId
      });
      
      enqueueSnackbar('여행 플랜이 성공적으로 수정되었습니다!', { variant: 'success' });
      navigate(`/plans/${planId}`, { state: { refresh: true } });
      
    } catch (error: any) {
      console.error('Error updating plan:', error);
      enqueueSnackbar('여행 플랜 수정에 실패했습니다.', { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!plan) return <ErrorMessage message="여행 플랜 정보가 없습니다." />;

  // form에 전달할 초기 데이터 구성
  const initialData: PlanFormInputs = {
    title: plan.title || '',
    startDate: plan.startDate || '',
    endDate: plan.endDate || '',
    companions: plan.companions || [],
    themes: plan.themes || [],
    estimatedBudget: Number(plan.estimatedBudget) || 0
  };

  return (
    <PageContainer>
      <Typography variant="h5" gutterBottom>여행 플랜 수정</Typography>
      <PlanForm 
        initialData={initialData} 
        onSubmit={handleUpdatePlan} 
        isEdit={true} 
      />
    </PageContainer>
  );
};

export default PlanEdit;