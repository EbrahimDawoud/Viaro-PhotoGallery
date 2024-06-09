// src/components/ResponsiveAppBar.jsx
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/config';
import { signOut } from 'firebase/auth';
import { useAuth } from '../../context/AuthContext';

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleMenuOpen = (event, type) => {
    if (type === 'nav') {
      setAnchorElNav(event.currentTarget);
    }
  };

  const handleMenuClose = () => {
    setAnchorElNav(null);
  };

  const handleNavigation = (path) => {
    handleMenuClose();
    navigate(path);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate('/Login');
      })
      .catch((error) => {
        console.error('Error signing out: ', error);
      });
    handleMenuClose();
  };

  return (
    <AppBar  sx={{ bgcolor: 'primary.main'}}>
      <Container>
        <Toolbar disableGutters>
          {/* Logo and App Title */}
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                display: { xs: 'flex', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                cursor: 'default',
                pointerEvents: 'none',
              }}
            >
              Viaro
            </Typography>
          </Box>

          {/* Navigation Buttons (Visible on larger screens) */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button color="inherit" onClick={() => handleNavigation('/home')}>
              Home
            </Button>
            {currentUser && (
              <Button color="inherit" onClick={() => handleNavigation('/Favorites')}>
                Favorites
              </Button>
            )}
            {currentUser ? (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button color="inherit" onClick={() => handleNavigation('/Login')}>
                Login
              </Button>
            )}
          </Box>

          {/* Mobile Menu */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="open menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={(e) => handleMenuOpen(e, 'nav')}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => handleNavigation('/home')}>Home</MenuItem>
              {currentUser && (
                <MenuItem onClick={() => handleNavigation('/Favorites')}>Favorites</MenuItem>
              )}
              {currentUser ? (
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              ) : (
                <MenuItem onClick={() => handleNavigation('/Login')}>Login</MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
