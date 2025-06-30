const axios = require('axios');

// Controller to fetch nearby hospitals based on user location
exports.getNearbyHospitals = async (req, res) => {
  const { lat, lng } = req.body;
  const geoapifyApiKey = process.env.GEOAPIFY_API_KEY;
  const url = `https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=circle:${lng},${lat},5000&apiKey=${geoapifyApiKey}`;

  try {
    const response = await axios.get(url);
    const hospitals = response.data.features;

    const hospitalData = hospitals.map(hospital => ({
      name: hospital.properties.name || "Unknown Hospital",
      address: hospital.properties.formatted || "Address not available",
      phone: hospital.properties.phone || "No contact number available",
      email: hospital.properties.email || "No email available",
    }));

    res.json(hospitalData);
  } catch (error) {
    console.error('Error fetching nearby hospitals:', error);
    res.status(500).json({ msg: 'Error fetching nearby hospitals' });
  }
};
