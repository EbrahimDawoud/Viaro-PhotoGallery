import React from 'react';
import { Alert, AlertTitle } from '@mui/material';

const ErrorAlert = ({ message }) => {
  if (!message) return null;

  return (
    <Alert severity="error" variant="filled" sx={{ mt: 2, width: '100%', margin:'4 auto', }}>{message}</Alert>
  );
};

export default ErrorAlert;
