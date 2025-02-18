// src/pages/plan/PlanCreate.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import PageContainer from '../../components/common/PageContainer';
import PlanForm from '../../components/plan/PlanForm';

const PlanCreate: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <PlanForm />
    </PageContainer>
  );
};

export default PlanCreate;