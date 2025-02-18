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
  startDate: string;
  endDate: string;
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

  return (
    <Card sx={{ mb: 2 }}>
      <CardActionArea onClick={() => navigate(`/plans/${planId}`)}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {format(new Date(startDate), 'yyyy.MM.dd')} - {format(new Date(endDate), 'yyyy.MM.dd')}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
            {themes.map((theme) => (
              <Chip key={theme} label={theme} size="small" />
            ))}
          </Box>
          <Typography variant="caption" color="text.secondary">
            작성일: {format(new Date(createdAt), 'yyyy.MM.dd')}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PlanListItem;