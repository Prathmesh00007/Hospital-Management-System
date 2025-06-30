import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Alert,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';

const AppointmentScheduling = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    email: '',
    doctor: '',
    date: null,
    time: null,
    reason: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const doctors = [
    { id: 1, name: 'Dr. John Smith', specialty: 'Cardiologist' },
    { id: 2, name: 'Dr. Sarah Johnson', specialty: 'Pediatrician' },
    { id: 3, name: 'Dr. Michael Brown', specialty: 'Neurologist' },
    { id: 4, name: 'Dr. Emily Davis', specialty: 'Dermatologist' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Appointment Data:', formData);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        patientName: '',
        phone: '',
        email: '',
        doctor: '',
        date: null,
        time: null,
        reason: '',
      });
    }, 3000);
  };

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: { xs: 2, sm: 4 },
          borderRadius: 2,
        }}
      >
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            mb: 4,
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' },
            textAlign: 'center'
          }}
        >
          Schedule an Appointment
        </Typography>

        {submitted && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Appointment scheduled successfully!
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Patient Name"
                value={formData.patientName}
                onChange={handleChange('patientName')}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                value={formData.phone}
                onChange={handleChange('phone')}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange('email')}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Select Doctor</InputLabel>
                <Select
                  value={formData.doctor}
                  onChange={handleChange('doctor')}
                  label="Select Doctor"
                >
                  {doctors.map((doctor) => (
                    <MenuItem key={doctor.id} value={doctor.id}>
                      {doctor.name} - {doctor.specialty}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Appointment Date"
                  value={formData.date}
                  onChange={(newValue) => {
                    setFormData({ ...formData, date: newValue });
                  }}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth required />
                  )}
                  minDate={new Date()}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  label="Appointment Time"
                  value={formData.time}
                  onChange={(newValue) => {
                    setFormData({ ...formData, time: newValue });
                  }}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth required />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Reason for Visit"
                multiline
                rows={4}
                value={formData.reason}
                onChange={handleChange('reason')}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{ 
                  mt: 2,
                  py: 1.5,
                  fontSize: '1.1rem'
                }}
              >
                Schedule Appointment
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <style jsx>{`
        @media (max-width: 600px) {
          form {
            padding: 0;
          }
        }
      `}</style>
    </Container>
  );
};

export default AppointmentScheduling; 