// src/components/common/ErrorMessage.tsx
import React from 'react';
import { Alert, AlertTitle, Box, Button } from '@mui/material';

interface ErrorMessageProps {
  message: string;
  retry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, retry }) => {
  return (
    <Box sx={{ p: 2 }}>
      <Alert 
        severity="error" 
        action={
          retry && (
            <Button color="inherit" size="small" onClick={retry}>
              재시도
            </Button>
          )
        }
      >
        <AlertTitle>오류 발생</AlertTitle>
        {message}
      </Alert>
    </Box>
  );
};

export default ErrorMessage;