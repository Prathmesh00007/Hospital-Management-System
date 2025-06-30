const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const router = express.Router();

const supabaseUrl = 'http://localhost:54321'; // Replace with your Supabase URL
const supabaseKey = process.env.SUPABASE_USER_KEY; // Use your Supabase user key
const supabase = createClient(supabaseUrl, supabaseKey);

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Log in the user with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Error logging in:', error.message);
      return res.status(400).json({ msg: 'Invalid login credentials' });
    }

    res.json({ token: data.session.access_token });
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ msg: 'An error occurred during login' });
  }
});

module.exports = router;
