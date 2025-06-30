import React, { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Dashboard,
  People,
  CalendarToday,
  LocalHospital,
  Assignment,
  LocationOn,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerWidth = 240;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/' },
    { text: 'Patients', icon: <People />, path: '/patients' },
    { text: 'Appointments', icon: <CalendarToday />, path: '/appointments' },
    { text: 'Doctors', icon: <LocalHospital />, path: '/doctors' },
    { text: 'Reports', icon: <Assignment />, path: '/reports' },
    { text: 'Find Hospitals', icon: <LocationOn />, path: '/hospitals' },
  ];

  const drawer = (
    <>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
          HealthCare HMS
        </Typography>
      </Box>
      <Box sx={{ p: 2 }}>
        {menuItems.map((item) => (
          <Button
            key={item.text}
            onClick={() => {
              navigate(item.path);
              if (isMobile) handleDrawerToggle();
            }}
            startIcon={item.icon}
            fullWidth
            sx={{
              justifyContent: 'flex-start',
              my: 1,
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.08)',
              },
            }}
          >
            {item.text}
          </Button>
        ))}
      </Box>
    </>
  );

  return (
    <>
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            position: 'fixed',
            top: '10px',
            left: '10px',
            zIndex: (theme) => theme.zIndex.drawer + 2,
            backgroundColor: 'white',
            boxShadow: 1,
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
            },
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? mobileOpen : true}
        onClose={isMobile ? handleDrawerToggle : undefined}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#fff',
            borderRight: '1px solid rgba(0, 0, 0, 0.12)',
            mt: { xs: 0, md: '64px' },
            height: { xs: '100%', md: 'calc(100% - 64px)' },
            zIndex: (theme) => theme.zIndex.drawer,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Sidebar;
