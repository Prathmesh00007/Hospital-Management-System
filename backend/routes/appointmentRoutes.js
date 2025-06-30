const express = require('express');
const axios = require('axios');
const router = express.Router();

// Schedule appointment via Zocdoc API
router.post('/schedule', async (req, res) => {
  const { date, time, doctor } = req.body;
  const zocdocApiKey = process.env.ZOCDOC_API_KEY;
  const zocdocUrl = 'https://api.zocdoc.com/v1/appointments';

  try {s
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
    res.status(500).json({ msg: 'Error scheduling appointment' });
  }
});

module.exports = router;
