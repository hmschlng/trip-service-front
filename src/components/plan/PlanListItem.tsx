// src/components/plan/PlanListItem.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  CardActionArea
} from '@mui/material';
import { format } from 'date-fns';

interface PlanListItemProps {
  planId: string;
  title: string;
  startDate: any;
  endDate: any;
  themes: string[];
  createdAt: string;
}

const PlanListItem: React.FC<PlanListItemProps> = ({
  planId,
  title,
  startDate,
  endDate,
  themes,
  createdAt
}) => {
  const navigate = useNavigate();

  // 날짜 형식 변환 함수
  const formatDate = (dateArray: any) => {
    if (Array.isArray(dateArray)) {
      // [2025, 3, 21] 형식을 "2025.03.21" 형식으로 변환
      return `${dateArray[0]}.${String(dateArray[1]).padStart(2, '0')}.${String(dateArray[2]).padStart(2, '0')}`;
    } else if (dateArray instanceof Date) {
      return dateArray.toISOString().split('T')[0].replace(/-/g, '.');
    } else if (typeof dateArray === 'string') {
      return new Date(dateArray).toISOString().split('T')[0].replace(/-/g, '.');
    }
    return 'Invalid date';
  };
  
  return (
    <Card sx={{ mb: 2 }}>
      <CardActionArea onClick={() => navigate(`/plans/${planId}`)}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {formatDate(startDate)} - {formatDate(endDate)}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
            {themes && themes.map((theme) => (
              <Chip key={theme} label={theme} size="small" />
            ))}
          </Box>
          <Typography variant="caption" color="text.secondary">
            작성일: {formatDate(createdAt)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PlanListItem;