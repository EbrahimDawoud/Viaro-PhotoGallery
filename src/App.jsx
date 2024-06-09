import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline, Container, Box, ThemeProvider, createTheme } from '@mui/material';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AllRoutes from './routes/AllRoutes';
import { AuthProvider } from './context/AuthContext';

import './App.css';
const defaultTheme = createTheme();

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Router>
          <Box sx={{ flexGrow: 1 }}>
          <Header />
            <Container
              sx={{
                mt: 4,
                minHeight: 'calc(100vh - 128px)', 
                minWidth: '80vw',
              }}
            >           
              <AllRoutes />
              <Footer />
            </Container>
          </Box>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
