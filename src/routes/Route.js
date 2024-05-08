/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from '../views/Login';
import Signup from '../views/Signup';
import { UserContext } from '../context/UserContext';
import Flow from '../views/Flow';
import NotFound from '../views/NoPage';
import LoaderView from '../views/LoaderView';

const RouteComponent = () => {
  const { authStatus, setAuthStatus } = useContext(UserContext);

  useEffect(() => {
    fetchUserData();
    console.log('changed', authStatus);
  }, [authStatus]);

  const fetchUserData = async () => {
    const user = localStorage.getItem('AUTH_TOKEN');
    if (user) {
      setAuthStatus('authenticated');
    } else {
      setAuthStatus('not authenticated');
    }
  };

  if (authStatus === 'INIT') return <LoaderView />;

  return (
    <BrowserRouter>
      <Routes>
        {authStatus === 'authenticated' ? (
          <>
            <Route path='/' element={<Flow />} />
            <Route path='*' element={<NotFound />} />
          </>
        ) : (
          <Route path='*' element={<Navigate to='/login' />} />
        )}
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteComponent;
