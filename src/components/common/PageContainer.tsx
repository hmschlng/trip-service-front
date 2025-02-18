// src/components/common/PageContainer.tsx
import React from 'react';
import { Container } from '@mui/material';

interface PageContainerProps {
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const PageContainer: React.FC<PageContainerProps> = ({ 
  children, 
  maxWidth = 'sm' 
}) => {
  return (
    <Container 
      maxWidth={maxWidth} 
      sx={{ 
        py: 2,
        px: { xs: 2, sm: 3 }
      }}
    >
      {children}
    </Container>
  );
};

export default PageContainer;