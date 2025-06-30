const { google } = require('googleapis');
const { GoogleAuth } = require('google-auth-library');

// Google Healthcare API setup
const projectId = process.env.GCP_PROJECT_ID;
const location = process.env.GCP_LOCATION;
const datasetId = process.env.GCP_DATASET_ID;
const fhirStoreId = process.env.GCP_FHIR_STORE_ID;

const healthcare = google.healthcare('v1');
const auth = new GoogleAuth({
  keyFilename: process.env.GCP_SERVICE_ACCOUNT_KEY, // Path to your service account key file
  scopes: ['https://www.googleapis.com/auth/cloud-platform'],
});

// Fetch health records for a specific patient
exports.getHealthRecords = async (req, res) => {
  const userId = req.user.id; // User ID from JWT or OAuth token
  const fhirPatientId = `Patient/${userId}`; // Map your user ID to FHIR Patient resource IDs

  const fhirStoreName = `projects/${projectId}/locations/${location}/datasets/${datasetId}/fhirStores/${fhirStoreId}`;

  try {
    const client = await auth.getClient();

    // Search for all FHIR resources linked to the patient
    const response = await healthcare.projects.locations.datasets.fhirStores.fhir.search({
      auth: client,
      parent: fhirStoreName,
      resourceType: 'Observation',
      params: { subject: fhirPatientId }, // Fetch resources related to this patient
    });

    const healthRecords = response.data.entry || [];
    res.json(healthRecords.map((entry) => entry.resource));
  } catch (error) {
    console.error('Error fetching health records from Google Healthcare API:', error);
    res.status(500).json({ msg: 'Error fetching health records' });
  }
};
