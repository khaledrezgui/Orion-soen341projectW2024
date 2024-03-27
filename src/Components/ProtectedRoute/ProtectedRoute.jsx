import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  if (!isLoggedIn) {
    // Redirect user to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send user
    // along to that page after logging in, which is a nicer user experience
    // than dropping user off on the home page.
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
