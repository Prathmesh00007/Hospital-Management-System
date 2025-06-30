import React, { useState } from 'react';
import axios from 'axios';

const AppointmentScheduler = () => {
  const [appointment, setAppointment] = useState({
    date: '',
    time: '',
    doctor: '',
  });

  const scheduleAppointment = () => {
    axios.post('/api/appointments/schedule', appointment)
      .then(response => {
        alert('Appointment Scheduled');
      })
      .catch(error => console.log(error));
  };

  return (
    <div>
      <h2>Schedule Appointment</h2>
      <input
        type="date"
        value={appointment.date}
        onChange={e => setAppointment({ ...appointment, date: e.target.value })}
      />
      <input
        type="time"
        value={appointment.time}
        onChange={e => setAppointment({ ...appointment, time: e.target.value })}
      />
      <input
        type="text"
        placeholder="Doctor Name"
        value={appointment.doctor}
        onChange={e => setAppointment({ ...appointment, doctor: e.target.value })}
      />
      <button onClick={scheduleAppointment}>Schedule</button>
    </div>
  );
};

export default AppointmentScheduler;
