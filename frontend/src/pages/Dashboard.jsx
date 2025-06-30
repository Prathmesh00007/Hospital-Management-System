import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
} from '@mui/material';
import {
  PeopleAlt,
  EventAvailable,
  LocalHospital,
  TrendingUp,
} from '@mui/icons-material';

const DashboardCard = ({ title, value, icon, color }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography color="textSecondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4">{value}</Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: `${color}20`,
            p: 1,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-content" style={{
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <Typography variant="h4" sx={{ 
          mb: 4,
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' } 
        }}>
          Dashboard
        </Typography>
        <div className="dashboard-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginTop: '20px',
        }}>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard
              title="Total Patients"
              value="1,234"
              icon={<PeopleAlt sx={{ color: '#1976d2' }} />}
              color="#1976d2"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard
              title="Appointments"
              value="42"
              icon={<EventAvailable sx={{ color: '#2ac3de' }} />}
              color="#2ac3de"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard
              title="Doctors"
              value="18"
              icon={<LocalHospital sx={{ color: '#2ecc71' }} />}
              color="#2ecc71"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard
              title="Revenue"
              value="$12,345"
              icon={<TrendingUp sx={{ color: '#e74c3c' }} />}
              color="#e74c3c"
            />
          </Grid>
        </div>
      </div>

      <style jsx>{`
        .dashboard-container {
          width: 100%;
          min-height: 100vh;
          padding-top: 20px;
        }

        @media (max-width: 900px) {
          .dashboard-container {
            padding-top: 60px; /* Space for mobile menu button */
          }
          
          .dashboard-content {
            padding: 15px;
          }
        }

        @media (max-width: 600px) {
          .dashboard-content {
            padding: 10px;
          }
          
          .dashboard-grid {
            gap: 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard; 