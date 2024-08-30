import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isSuperuser = useSelector((state) => state.user.isSuperuser);
  return isSuperuser ? children : <Navigate to="/home" replace />;
};

export default ProtectedRoute;
