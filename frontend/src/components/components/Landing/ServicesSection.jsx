import React from 'react';
import { Box, Container, Grid, Typography, Card, CardContent } from '@mui/material';
import {
  LocalHospital,
  MedicalServices,
  Psychology,
  Biotech,
  MonitorHeart,
  ChildCare,
} from '@mui/icons-material';

const services = [
  {
    icon: <LocalHospital sx={{ fontSize: 40 }} />,
    title: 'Emergency Care',
    description: '24/7 emergency medical services with rapid response teams.',
  },
  {
    icon: <MedicalServices sx={{ fontSize: 40 }} />,
    title: 'General Medicine',
    description: 'Comprehensive medical care for all your health needs.',
  },
  {
    icon: <Psychology sx={{ fontSize: 40 }} />,
    title: 'Mental Health',
    description: 'Professional mental health services and counseling.',
  },
  {
    icon: <Biotech sx={{ fontSize: 40 }} />,
    title: 'Lab Services',
    description: 'Advanced diagnostic and laboratory testing facilities.',
  },
  {
    icon: <MonitorHeart sx={{ fontSize: 40 }} />,
    title: 'Cardiology',
    description: 'Expert cardiac care with modern equipment.',
  },
  {
    icon: <ChildCare sx={{ fontSize: 40 }} />,
    title: 'Pediatrics',
    description: 'Specialized care for children of all ages.',
  },
];

const ServicesSection = () => {
  return (
    <Box sx={{ py: 8, bgcolor: '#f5f5f5' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          align="center"
          sx={{ mb: 6, fontWeight: 600 }}
        >
          Our Services
        </Typography>
        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 4,
                  },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      mb: 2,
                      color: 'primary.main',
                    }}
                  >
                    {service.icon}
                  </Box>
                  <Typography
                    variant="h5"
                    align="center"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    {service.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    align="center"
                    color="text.secondary"
                  >
                    {service.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ServicesSection; 