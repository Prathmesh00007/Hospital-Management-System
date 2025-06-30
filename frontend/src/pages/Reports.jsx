import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  PeopleAlt,
  EventAvailable,
  LocalHospital,
  TrendingUp,
} from '@mui/icons-material';

const Reports = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const statistics = [
    {
      title: 'Total Patients',
      value: '1,234',
      icon: <PeopleAlt sx={{ fontSize: 40 }} />,
      color: '#1976d2',
    },
    {
      title: 'Monthly Appointments',
      value: '156',
      icon: <EventAvailable sx={{ fontSize: 40 }} />,
      color: '#2ac3de',
    },
    {
      title: 'Active Doctors',
      value: '18',
      icon: <LocalHospital sx={{ fontSize: 40 }} />,
      color: '#2ecc71',
    },
    {
      title: 'Monthly Revenue',
      value: '$45,678',
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      color: '#e74c3c',
    },
  ];

  const recentActivity = [
    { date: '2024-03-15', description: 'New patient registration: John Doe' },
    { date: '2024-03-15', description: 'Appointment completed with Dr. Smith' },
    { date: '2024-03-14', description: 'Lab results uploaded for Jane Smith' },
    { date: '2024-03-14', description: 'New appointment scheduled' },
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
        Reports & Analytics
      </Typography>

      <Grid container spacing={3}>
        {statistics.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 3, 
                borderRadius: 2,
                height: '100%',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    {stat.title}
                  </Typography>
                  <Typography variant="h4" component="div">
                    {stat.value}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    backgroundColor: `${stat.color}20`,
                    p: 1,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {React.cloneElement(stat.icon, { sx: { color: stat.color } })}
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}

        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <Box>
              {recentActivity.map((activity, index) => (
                <Box
                  key={index}
                  sx={{
                    py: 2,
                    borderBottom: index !== recentActivity.length - 1 ? '1px solid #eee' : 'none',
                  }}
                >
                  <Typography variant="body2" color="textSecondary">
                    {activity.date}
                  </Typography>
                  <Typography>
                    {activity.description}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Reports; 