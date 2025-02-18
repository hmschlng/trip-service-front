// src/components/common/Header.tsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  Box 
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const getPageTitle = () => {
    switch (location.pathname.split('/')[1]) {
      case '': return '여행 서비스';
      case 'login': return '로그인';
      case 'signup': return '회원가입';
      case 'plans': return '여행 플랜';
      case 'recommendations': return '추천 여행지';
      case 'reviews': return '여행 후기';
      default: return '여행 서비스';
    }
  };

  const showBackButton = location.pathname !== '/';

  return (
    <AppBar position="fixed">
      <Toolbar>
        {showBackButton && (
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => navigate(-1)}
            sx={{ mr: 2 }}
          >
            <ArrowBack />
          </IconButton>
        )}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {getPageTitle()}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;