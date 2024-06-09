import React from 'react';
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';

const FormSnackbar = ({ message, severity = 'success', open, onClose }) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default FormSnackbar;
