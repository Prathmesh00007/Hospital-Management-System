import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  useTheme,
  useMediaQuery,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Appointments = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const appointments = [
    {
      id: 1,
      patientName: 'John Doe',
      doctorName: 'Dr. Sarah Johnson',
      date: '2024-03-20',
      time: '10:00 AM',
      status: 'Scheduled',
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      doctorName: 'Dr. Michael Brown',
      date: '2024-03-21',
      time: '2:30 PM',
      status: 'Confirmed',
    },
    // Add more appointments as needed
  ];

  const handleNewAppointment = () => {
    navigate('/appointments/schedule');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' },
          }}
        >
          Appointments
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleNewAppointment}
          sx={{ 
            whiteSpace: 'nowrap',
            px: { xs: 2, sm: 3 },
            py: { xs: 1, sm: 1.5 },
          }}
        >
          New Appointment
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Patient</TableCell>
                    {!isMobile && <TableCell>Doctor</TableCell>}
                    <TableCell>Date</TableCell>
                    {!isMobile && <TableCell>Time</TableCell>}
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>{appointment.patientName}</TableCell>
                      {!isMobile && <TableCell>{appointment.doctorName}</TableCell>}
                      <TableCell>{appointment.date}</TableCell>
                      {!isMobile && <TableCell>{appointment.time}</TableCell>}
                      <TableCell>
                        <Box
                          sx={{
                            backgroundColor: 
                              appointment.status === 'Confirmed' 
                                ? 'success.light' 
                                : 'info.light',
                            color: 'white',
                            py: 0.5,
                            px: 1,
                            borderRadius: 1,
                            display: 'inline-block',
                          }}
                        >
                          {appointment.status}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Appointments; 