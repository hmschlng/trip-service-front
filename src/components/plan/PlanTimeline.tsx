// src/components/plan/PlanTimeline.tsx
import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Divider,
  Avatar
} from '@mui/material';
import { format } from 'date-fns';

interface TimelineItemData {
  date: string;
  time: string;
  activity: string;
  location: string;
}

interface PlanTimelineProps {
  items: TimelineItemData[];
}

const PlanTimeline: React.FC<PlanTimelineProps> = ({ items }) => {
  return (
    <Box sx={{ position: 'relative', my: 2 }}>
      {items.map((item, index) => (
        <Box 
          key={index} 
          sx={{ 
            display: 'flex', 
            mb: 3,
            position: 'relative'
          }}
        >
          {/* 왼쪽 시간 영역 */}
          <Box 
            sx={{ 
              width: '80px', 
              textAlign: 'right', 
              pr: 2,
              pt: 0.5
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {format(new Date(`${item.date} ${item.time}`), 'HH:mm')}
            </Typography>
          </Box>

          {/* 중앙 타임라인 라인 영역 */}
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              mx: 1
            }}
          >
            <Avatar 
              sx={{ 
                width: 24, 
                height: 24, 
                bgcolor: 'primary.main',
                zIndex: 1
              }}
            />
            {index < items.length - 1 && (
              <Box 
                sx={{ 
                  width: '2px', 
                  flexGrow: 1, 
                  bgcolor: 'grey.300',
                  my: 0.5
                }}
              />
            )}
          </Box>

          {/* 오른쪽 콘텐츠 영역 */}
          <Box sx={{ flex: 1 }}>
            <Paper 
              elevation={1} 
              sx={{ 
                p: 2, 
                borderRadius: 2
              }}
            >
              <Typography variant="h6" component="h3">
                {item.activity}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.location}
              </Typography>
            </Paper>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default PlanTimeline;