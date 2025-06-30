const axios = require('axios');

// Controller for scheduling appointment
exports.scheduleAppointment = async (req, res) => {
  const { date, time, doctor } = req.body;
  const zocdocApiKey = process.env.ZOCDOC_API_KEY;
  const zocdocUrl = 'https://api.zocdoc.com/v1/appointments';

  try {
    const response = await axios.post(zocdocUrl, {
      date,
      time,
      doctor,
    }, {
      headers: {
        'Authorization': `Bearer ${zocdocApiKey}`,
      },
    });
    res.json({ msg: 'Appointment Scheduled', appointmentId: response.data.id });
  } catch (error) {
    console.error('Error scheduling appointment:', error);
    res.status(500).json({ msg: 'Error scheduling appointment' });
  }
};
