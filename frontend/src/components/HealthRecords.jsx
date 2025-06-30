import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HealthRecords = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHealthRecords = async () => {
      try {
        // Replace with the actual backend endpoint URL
        const response = await axios.get('http://localhost:5000/api/health-records', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure the token is sent if required by the backend
          },
        });

        // Assuming the backend returns an array of health records
        setRecords(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching health records:', err);
        setError('Failed to load health records.');
        setLoading(false);
      }
    };

    fetchHealthRecords();
  }, []);

  if (loading) return <div>Loading health records...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Health Records</h2>
      <ul>
        {records.length > 0 ? (
          records.map((record, index) => (
            <li key={index}>
              <h3>{record.name?.[0]?.text || 'Unknown Name'}</h3>
              <p>Gender: {record.gender || 'N/A'}</p>
              <p>Birth Date: {record.birthDate || 'N/A'}</p>
              <p>Status: {record.status || 'N/A'}</p>
            </li>
          ))
        ) : (
          <p>No health records found.</p>
        )}
      </ul>
    </div>
  );
};

export default HealthRecords;
