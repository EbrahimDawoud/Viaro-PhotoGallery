import React from 'react';
import { CircularProgress } from '@mui/material';
import {Box} from '@mui/material';

const Loading = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
};

export default Loading;