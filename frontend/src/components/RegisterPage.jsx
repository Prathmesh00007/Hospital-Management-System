import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

// Supabase Configuration
const supabaseUrl = 'https://jheukukbuchleoxtzbux.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpoZXVrdWtidWNobGVveHR6YnV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUwNDY5MjcsImV4cCI6MjA1MDYyMjkyN30.JLIG_N8_vWqAbZVMeeyQaQuUx8d7ykabcUztwMqwVUE';
const supabase = createClient(supabaseUrl, supabaseKey);

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    // Clear previous error messages
    setErrorMessage('');

    // Basic validation
    if (!email || !password || !fullName || !dateOfBirth) {
      setErrorMessage('All fields are required');
      return;
    }

    setLoading(true);

    try {
      // Sign up the user
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) throw signUpError;

      const user = data.user;

      if (user) {
        // Insert user details into profiles table
        const { error: insertError } = await supabase.from('profiles').insert([
          {
            id: user.id,
            full_name: fullName,
            date_of_birth: dateOfBirth,
          },
        ]);

        if (insertError) throw insertError;

        console.log('User registered successfully');
        alert('Registration successful! Please verify your email.');
        navigate('/login'); // Redirect to login page
      }
    } catch (error) {
      setErrorMessage(
        error.message || 'An error occurred during registration. Please try again.'
      );
      console.error('Error registering user:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
      <h2>Register</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ margin: '10px 0', padding: '10px', width: '100%' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{ margin: '10px 0', padding: '10px', width: '100%' }}
      />
      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
        style={{ margin: '10px 0', padding: '10px', width: '100%' }}
      />
      <input
        type="date"
        value={dateOfBirth}
        onChange={(e) => setDateOfBirth(e.target.value)}
        required
        style={{ margin: '10px 0', padding: '10px', width: '100%' }}
      />
      <button
        onClick={handleRegister}
        disabled={loading}
        style={{
          padding: '10px',
          backgroundColor: '#007BFF',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          width: '100%',
        }}
      >
        {loading ? 'Registering...' : 'Register'}
      </button>
    </div>
  );
};

export default Register;
