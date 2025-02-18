// src/pages/Home.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid
} from '@mui/material';
import {
  Map as MapIcon,
  Explore as ExploreIcon,
  RateReview as ReviewIcon
} from '@mui/icons-material';
import PageContainer from '../components/common/PageContainer';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <Typography variant="h5" gutterBottom>
        나만의 여행을 시작해보세요
      </Typography>
      
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <Paper
            sx={{ p: 2, cursor: 'pointer' }}
            onClick={() => navigate('/plans/new')}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <MapIcon color="primary" />
              <Box>
                <Typography variant="h6">여행 플랜 만들기</Typography>
                <Typography variant="body2" color="text.secondary">
                  새로운 여행 계획을 세워보세요
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper
            sx={{ p: 2, cursor: 'pointer' }}
            onClick={() => navigate('/recommendations')}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <ExploreIcon color="primary" />
              <Box>
                <Typography variant="h6">여행지 추천</Typography>
                <Typography variant="body2" color="text.secondary">
                  AI가 추천하는 맞춤 여행지
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper
            sx={{ p: 2, cursor: 'pointer' }}
            onClick={() => navigate('/reviews')}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <ReviewIcon color="primary" />
              <Box>
                <Typography variant="h6">여행 후기</Typography>
                <Typography variant="body2" color="text.secondary">
                  여행의 추억을 공유해보세요
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Home;