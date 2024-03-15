import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const isAdmin = localStorage.getItem('isAdmin'); // Assuming 'isAdmin' is stored as a stringified boolean ('true' or 'false')

  if (!isLoggedIn || isAdmin !== 'true') {
    // If user is not logged in or not an admin, redirect to login page
    // You could also redirect to a different page if you want to show a specific message to non-admin users
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;
