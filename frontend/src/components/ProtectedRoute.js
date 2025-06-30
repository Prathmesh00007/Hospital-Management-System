import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, user }) => {
  return user ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
