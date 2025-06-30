import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Layout from './components/components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Appointments from './pages/Appointments';
import AppointmentScheduling from './components/components/Appointments/AppointmentScheduling';
import Doctors from './pages/Doctors';
import Reports from './components/HealthRecords';

import Login from './components/LoginPage';
import HospitalLocator from './components/HospitalLocator';
import Profile from './pages/Profile';
import Home from './pages/Home';
import './App.css';
import Register from './components/RegisterPage';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if the user is logged in on app load
    const token = localStorage.getItem('authToken');
    if (token) {
      axios.get('/api/users/me', { headers: { Authorization: `Bearer ${token}` } })
        .then(response => setUser(response.data))
        .catch(error => console.log('Error fetching user data:', error));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
       
       
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/*"
              element={
                <Layout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/patients" element={<Patients />} />
                    <Route path="/appointments" element={<Appointments />} />
                    <Route path="/appointments/schedule" element={<AppointmentScheduling />} />
                    <Route path="/doctors" element={<Doctors />} />
                    <Route path="/hospitals" element={<HospitalLocator />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/profile" element={<Profile />} />
                  </Routes>
                </Layout>
              }
            />
          </Routes>
       
      </div>
    </Router>
  );
}

export default App;
