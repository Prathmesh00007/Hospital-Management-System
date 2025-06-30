import React from 'react';
import { Box } from '@mui/material';
import HeroSection from '../components/components/Landing/HeroSection';
import ServicesSection from '../components/components/Landing/ServicesSection';
import ContactSection from '../components/components/Landing/ContactSection';

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