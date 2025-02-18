// src/components/common/ErrorMessage.tsx
import React from 'react';
import { Alert, AlertTitle, Box } from '@mui/material';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <Box sx={{ p: 2 }}>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {message}
      </Alert>
    </Box>
  );
};

export default ErrorMessage;