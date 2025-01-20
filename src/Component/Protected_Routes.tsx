// ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../Context/UserContext';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useUser(); // Access user context to check authentication

  // If user is not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Render the protected component if authenticated
  return children;
};

export default ProtectedRoute;
