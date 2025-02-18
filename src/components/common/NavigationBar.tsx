// src/components/common/NavigationBar.tsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  BottomNavigation, 
  BottomNavigationAction, 
  Paper 
} from '@mui/material';
import {
  Home,
  Map,
  RateReview,
  Person
} from '@mui/icons-material';

const NavigationBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getCurrentValue = () => {
    const path = location.pathname.split('/')[1];
    switch (path) {
      case '': return 0;
      case 'plans': return 1;
      case 'recommendations': return 2;
      case 'reviews': return 3;
      default: return 0;
    }
  };

  return (
    <Paper 
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} 
      elevation={3}
    >
      <BottomNavigation
        value={getCurrentValue()}
        onChange={(_, newValue) => {
          switch (newValue) {
            case 0:
              navigate('/');
              break;
            case 1:
              navigate('/plans');
              break;
            case 2:
              navigate('/recommendations');
              break;
            case 3:
              navigate('/reviews');
              break;
          }
        }}
      >
        <BottomNavigationAction label="홈" icon={<Home />} />
        <BottomNavigationAction label="여행 플랜" icon={<Map />} />
        <BottomNavigationAction label="추천 여행지" icon={<RateReview />} />
        <BottomNavigationAction label="여행 후기" icon={<Person />} />
      </BottomNavigation>
    </Paper>
  );
};

export default NavigationBar;