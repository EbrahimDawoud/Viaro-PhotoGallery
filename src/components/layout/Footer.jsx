import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Footer() {
  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: 'primary.main', 
        color: 'white', 
        py: 3, 
        mt: '20px', 
        width: '100%',
        position: 'relative',
        bottom: 0
      }}
    >
      <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Follow me on LinkedIn: {' '}
          <Link 
            color="inherit" 
            href="https://www.linkedin.com/in/ebrahim-osama-dawood"
            sx={{ textDecoration: 'none', '&:hover': { color: 'inherit' } }} 
          >
            Ebrahim Osama Dawood
          </Link>
        </Typography>
        
        <Typography variant="body2" sx={{ color: 'white' }}>
          {'© '}
          {new Date().getFullYear()}
          {' '}
          <Link 
            color="inherit" 
            href="https://www.linkedin.com/in/ebrahim-osama-dawood"
            sx={{ textDecoration: 'none', '&:hover': { color: 'inherit' } }} 
          >
            Viaro
          </Link>
          {'. All rights reserved.'}
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
