// src/components/plan/PlanDetail.tsx
import React from 'react';
import {
  Box,
  Typography,
  Chip,
  Divider,
  Button
} from '@mui/material';
import { format } from 'date-fns';

interface PlanDetailProps {
  title: string;
  startDate: string;
  endDate: string;
  companions: string[];
  themes: string[];
  estimatedBudget: number;
  onEditClick: () => void;
}

const PlanDetail: React.FC<PlanDetailProps> = ({
  title,
  startDate,
  endDate,
  companions,
  themes,
  estimatedBudget,
  onEditClick
}) => {
  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">{title}</Typography>
        <Button variant="outlined" onClick={onEditClick}>수정</Button>
      </Box>

      <Typography variant="body1" sx={{ mb: 2 }}>
        {format(new Date(startDate), 'yyyy.MM.dd')} - {format(new Date(endDate), 'yyyy.MM.dd')}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle1" gutterBottom>동행자</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
        {companions.map((companion) => (
          <Chip key={companion} label={companion} variant="outlined" />
        ))}
      </Box>

      <Typography variant="subtitle1" gutterBottom>여행 테마</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
        {themes.map((theme) => (
          <Chip key={theme} label={theme} color="primary" />
        ))}
      </Box>

      <Typography variant="subtitle1" gutterBottom>예상 경비</Typography>
      <Typography variant="h6">
        {estimatedBudget.toLocaleString()}원
      </Typography>
    </Box>
  );
};

export default PlanDetail;