import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';

const Doctors = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const doctors = [
    {
      id: 1,
      name: 'Dr. John Smith',
      specialty: 'Cardiologist',
      experience: '15 years',
      image: 'https://via.placeholder.com/150',
      availability: 'Mon-Fri',
    },
    {
      id: 2,
      name: 'Dr. Sarah Johnson',
      specialty: 'Pediatrician',
      experience: '10 years',
      image: 'https://via.placeholder.com/150',
      availability: 'Mon-Wed',
    },
    // Add more doctors as needed
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          mb: 4,
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' },
        }}
      >
        Our Doctors
      </Typography>

      <Grid container spacing={3}>
        {doctors.map((doctor) => (
          <Grid item xs={12} sm={6} md={4} key={doctor.id}>
            <Card elevation={3}>
              <CardMedia
                component="img"
                height="200"
                image={doctor.image}
                alt={doctor.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {doctor.name}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Chip
                    label={doctor.specialty}
                    color="primary"
                    size={isMobile ? 'small' : 'medium'}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Experience: {doctor.experience}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Available: {doctor.availability}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Doctors; 