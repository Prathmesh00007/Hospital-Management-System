const express = require('express');
const axios = require('axios');
const router = express.Router();

// Fetch nearby hospitals based on user's location
router.post('/nearby', async (req, res) => {
  const { lat, lng } = req.body;
  const geoapifyApiKey = process.env.GEOAPIFY_API_KEY;
  const url = `https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=circle:${lng},${lat},5000&apiKey=${geoapifyApiKey}`;

  try {
    const response = await axios.get(url);
    const hospitals = response.data.features;
    res.json(hospitals);
  } catch (error) {
    res.status(500).send('Error fetching nearby hospitals');
  }
});

module.exports = router;
