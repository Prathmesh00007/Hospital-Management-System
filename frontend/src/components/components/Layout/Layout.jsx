import React from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8, // Space for header
          ml: { sm: '240px' }, // Space for sidebar
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout; 