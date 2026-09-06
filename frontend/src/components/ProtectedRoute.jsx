import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Redirect user to their role-specific default dashboard
    const roleRoutes = {
      ADMIN: '/admin/dashboard',
      DOCTOR: '/doctor/dashboard',
      PATIENT: '/patient/dashboard',
      RECEPTIONIST: '/receptionist/dashboard',
      PHARMACIST: '/pharmacist/dashboard',
    };
    return <Navigate to={roleRoutes[user.role] || '/login'} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
