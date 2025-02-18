// src/components/common/Layout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './Header';
import NavigationBar from './NavigationBar';

const Layout: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1, pb: 7, pt: 8 }}>
        <Outlet />
      </Box>
      <NavigationBar />
    </Box>
  );
};

export default Layout;