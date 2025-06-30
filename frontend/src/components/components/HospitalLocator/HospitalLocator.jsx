import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import { LocalHospital, LocationOn, Phone, AccessTime } from '@mui/icons-material';

const HospitalLocator = () => {
  const [location, setLocation] = useState('');
  const [hospitals, setHospitals] = useState([
    {
      id: 1,
      name: 'City General Hospital',
      address: '123 Healthcare Ave',
      distance: '2.5 km',
      phone: '(555) 123-4567',
      hours: '24/7',
    },
    // Add more sample hospitals
  ]);

  const handleSearch = () => {
    // Implement actual hospital search logic here
    // You would typically make an API call to a backend service
    console.log('Searching hospitals near:', location);
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Find Nearby Hospitals
      </Typography>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              label="Enter your location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              startIcon={<LocationOn />}
            >
              Search
            </Button>
          </Box>
        </CardContent>
      </Card>

      <List>
        {hospitals.map((hospital) => (
          <React.Fragment key={hospital.id}>
            <ListItem>
              <Card sx={{ width: '100%' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocalHospital color="primary" />
                    {hospital.name}
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <LocationOn />
                      </ListItemIcon>
                      <ListItemText 
                        primary={hospital.address}
                        secondary={`Distance: ${hospital.distance}`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Phone />
                      </ListItemIcon>
                      <ListItemText primary={hospital.phone} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <AccessTime />
                      </ListItemIcon>
                      <ListItemText primary={hospital.hours} />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default HospitalLocator; 