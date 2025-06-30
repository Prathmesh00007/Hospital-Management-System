import React, { useState } from 'react';
import axios from 'axios';

const HospitalLator = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [useManualInput, setUseManualInput] = useState(false); // Toggle between auto and manual input

  const getLocationAndHospitals = () => {
    setLoading(true);
    setError('');

    // Geolocation API
    if (!useManualInput && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // Fetch hospitals using detected coordinates
          fetchHospitals(latitude, longitude);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setError('Failed to detect location. Please enable location access or use manual input.');
          setUseManualInput(true); // Switch to manual input on error
          setLoading(false);
        }
      );
    } else if (useManualInput) {
      if (lat && lng) {
        fetchHospitals(lat, lng); // Fetch hospitals using manually entered coordinates
      } else {
        setError('Please enter valid latitude and longitude.');
        setLoading(false);
      }
    } else {
      setError('Geolocation is not supported by your browser.');
      setUseManualInput(true); // Switch to manual input on error
      setLoading(false);
    }
  };

  const fetchHospitals = (latitude, longitude) => {
    axios
      .post('http://localhost:5000/api/hospitals/nearby', { lat: latitude, lng: longitude })
      .then((response) => {
        setHospitals(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching hospitals:', error);
        setError('Failed to fetch hospitals. Please try again.');
        setLoading(false);
      });
  };

  return (
    <div>
      <h2>Nearby Hospitals</h2>
      {!useManualInput && (
        <button onClick={getLocationAndHospitals}>Detect My Location</button>
      )}

      {useManualInput && (
        <div>
          <input
            type="number"
            placeholder="Latitude"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
          />
          <input
            type="number"
            placeholder="Longitude"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
          />
          <button onClick={getLocationAndHospitals}>Search</button>
        </div>
      )}

      {loading && <p>Loading hospitals...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {hospitals.map((hospital, index) => (
          <li key={index}>
            <h3>{hospital.properties.name}</h3>
            {/* Full Address */}
            <p>{hospital.properties.formatted}</p>
            {/* Contact Info (Phone) */}
            <p>{hospital.properties.contact?.phone || 'No phone contact available'}</p>
            {/* Contact Info (Email if available) */}
            <p>{hospital.properties.contact?.email || 'No email contact available'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HospitalLator;
