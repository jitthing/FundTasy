import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  /* TODO
  - Verify the token with server (request to middleware) each time the user navigates to a protected route
  - Right now, just checking if the token is present in localStorage
   */
  const navigate = useNavigate();
  const hasToken = localStorage.getItem('authToken');

  useEffect(() => {
    if (!hasToken) {
      navigate('/login');
    }
  }, [hasToken, navigate]);

  return hasToken ? children : null;
};

export default PrivateRoute;