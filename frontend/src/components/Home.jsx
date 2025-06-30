import React from 'react';
import { Box } from '@mui/material';
import HeroSection from '../components/Landing/HeroSection';
import ServicesSection from '../components/Landing/ServicesSection';
import ContactSection from '../components/Landing/ContactSection';

const Home = () => {
  return (
    <Box>
      <HeroSection />
      <ServicesSection />
      <ContactSection />
    </Box>
  );
};

export default Home; 