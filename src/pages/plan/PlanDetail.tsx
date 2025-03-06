// src/pages/plan/PlanDetail.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Tab, Tabs } from '@mui/material';
import PageContainer from '../../components/common/PageContainer';
import PlanDetail from '../../components/plan/PlanDetail';
import PlanTimeline from '../../components/plan/PlanTimeline';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';

const PlanDetailPage: React.FC = () => {
  const { planId } = useParams<{ planId: string }>();
  const [value, setValue] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    // TODO: API 연동
    setIsLoading(false);
  }, [planId]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

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
          title="제주도 여행"
          startDate="2024-03-01"
          endDate="2024-03-03"
          companions={['friend@example.com']}
          themes={['관광', '맛집']}
          estimatedBudget={500000}
          onEditClick={() => console.log('Edit clicked')}
        />
      )}

      {value === 1 && (
        <PlanTimeline
          items={[
            {
              date: '2024-03-01',
              time: '10:00',
              activity: '제주공항 도착',
              location: '제주국제공항'
            },
            {
              date: '2024-03-01',
              time: '12:00',
              activity: '점심 식사',
              location: '제주 흑돼지 맛집'
            }
          ]}
        />
      )}
    </PageContainer>
  );
};

export default PlanDetailPage;