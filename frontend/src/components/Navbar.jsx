import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, handleLogout }) => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        Healthcare System
      </Link>
      <div className="navbar-links">
        {user ? (
          <>
            <Link to="/appointments">Appointments</Link>
            <Link to="/health-records">Health Records</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
