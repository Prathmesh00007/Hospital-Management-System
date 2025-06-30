const express = require('express');
const router = express.Router();
const healthRecordController = require('../controllers/healthRecordController');
const { createClient } = require('@supabase/supabase-js');

// Supabase Configuration
const supabaseUrl = 'http://localhost:54321'; // Replace with your Supabase URL
const supabaseKey = process.env.SUPABASE_SERVICE_KEY; // Use a service role key for server-side operations
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware to verify user authentication using Supabase
const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Extract the Bearer token
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: Missing token' });
    }

    // Verify the token with Supabase
    const { data: user, error } = await supabase.auth.getUser(token);
    if (error || !user) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    // Attach the user to the request object
    req.user = { id: user.id }; // Supabase User ID
    next();
  } catch (err) {
    console.error('Authentication error:', err);
    res.status(500).json({ error: 'Internal server error during authentication' });
  }
};

// Fetch health records
router.get('/', authenticate, healthRecordController.getHealthRecords);

module.exports = router;
