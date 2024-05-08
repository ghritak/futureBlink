import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../views/Login';
import Signup from '../views/Signup';
import AuthRoutes from './AuthRoutes';

const RouteComponent = ({ isAuthenticated }) => {
  return (
    <Routes>
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<Signup />} />
      {isAuthenticated ? (
        <AuthRoutes />
      ) : (
        <Route path='*' element={<Navigate to='/login' />} />
      )}
    </Routes>
  );
};

export default RouteComponent;
