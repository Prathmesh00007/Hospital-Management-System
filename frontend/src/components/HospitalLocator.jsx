import React, { useState, useEffect } from 'react';
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
import {
  LocalHospital,
  LocationOn,
  Phone,
  AccessTime,
} from '@mui/icons-material';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

const HospitalLocator = () => {
  const [location, setLocation] = useState('');
  const [hospitals, setHospitals] = useState([]);
  const [map, setMap] = useState(null);
  const [markerLayer, setMarkerLayer] = useState(null);
  const [userLocation, setUserLocation] = useState({ lat: 51.505, lon: -0.09 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [useManualInput, setUseManualInput] = useState(false);

  useEffect(() => {
    const mapInstance = L.map('map').setView([userLocation.lat, userLocation.lon], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapInstance);

    setMap(mapInstance);

    return () => {
      mapInstance.remove();
    };
  }, []);

  const handleSearch = () => {
    if (!useManualInput && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lon: longitude });
          if (map) {
            map.setView([latitude, longitude], 13);
          }
          fetchHospitals(latitude, longitude);
        },
        (err) => {
          setError('Failed to detect location. Enable location access or use manual input.');
          setUseManualInput(true);
        }
      );
    } else if (useManualInput) {
      if (lat && lng) {
        const latitude = parseFloat(lat);
        const longitude = parseFloat(lng);
        setUserLocation({ lat: latitude, lon: longitude });
        if (map) {
          map.setView([latitude, longitude], 13);
        }
        fetchHospitals(latitude, longitude);
      } else {
        setError('Please enter valid latitude and longitude.');
      }
    }
  };

  const fetchHospitals = (latitude, longitude) => {
    setLoading(true);
    setError('');

    axios
      .post('http://localhost:5000/api/hospitals/nearby', { lat: latitude, lng: longitude })
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          setHospitals(response.data);
          if (markerLayer) {
            markerLayer.clearLayers();
          }

          const hospitalIcon = L.icon({
            iconUrl: './location-pin.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32],
          });

          const newLayer = L.layerGroup();
          response.data.forEach((hospital) => {
            const { coordinates } = hospital.geometry;
            const { name, address_line1, address_line2 } = hospital.properties;

            if (coordinates && coordinates.length === 2) {
              L.marker([coordinates[1], coordinates[0]], { icon: hospitalIcon })
                .addTo(newLayer)
                .bindPopup(
                  `<b>${name}</b><br>${address_line1}<br>${
                    address_line2 || 'No additional address information'
                  }`
                );
            }
          });

          newLayer.addTo(map);
          setMarkerLayer(newLayer);
        } else {
          setError('No nearby hospitals found.');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch hospitals. Please try again.');
        setLoading(false);
      });
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Find Nearby Hospitals
      </Typography>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {!useManualInput ? (
              <Button
                variant="contained"
                onClick={handleSearch}
                startIcon={<LocationOn />}
              >
                Detect My Location
              </Button>
            ) : (
              <>
                <TextField
                  fullWidth
                  label="Latitude"
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Longitude"
                  value={lng}
                  onChange={(e) => setLng(e.target.value)}
                />
                <Button variant="contained" onClick={handleSearch}>
                  Search
                </Button>
              </>
            )}
          </Box>
        </CardContent>
      </Card>

      {loading && <Typography>Loading hospitals...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      <List>
        {hospitals.map((hospital, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <Card sx={{ width: '100%' }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                  >
                    <LocalHospital color="primary" />
                    {hospital.properties.name}
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <LocationOn />
                      </ListItemIcon>
                      <ListItemText
                        primary={hospital.properties.address_line1}
                        secondary={`Distance: ${hospital.properties.distance || 'Unknown'}`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Phone />
                      </ListItemIcon>
                      <ListItemText
                        primary={hospital.properties.phone || 'No contact available'}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <AccessTime />
                      </ListItemIcon>
                      <ListItemText
                        primary={hospital.properties.hours || 'No hours available'}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>

      <Box id="map" sx={{ height: '500px', width: '100%', mt: 3 }}></Box>
    </Box>
  );
};

export default HospitalLocator;
