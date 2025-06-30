const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_USER_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Controller for user registration
exports.registerUser = async (req, res) => {
  const { email, password, fullName, dateOfBirth } = req.body;

  try {
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    // Optionally save additional user details in a "profiles" table
    const { data, error: profileError } = await supabase
      .from('profiles')
      .insert([{ id: user.id, full_name: fullName, date_of_birth: dateOfBirth }]);

    if (profileError) throw profileError;

    res.status(201).json({ msg: 'User registered successfully', user });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ msg: 'Error registering user' });
  }
};

// Controller for user login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data: session, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    res.json({ token: session.access_token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(400).json({ msg: 'Invalid login credentials' });
  }
};
