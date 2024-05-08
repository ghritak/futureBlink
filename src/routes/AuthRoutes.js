import React from 'react';
import { Route } from 'react-router-dom';

import Flow from '../views/Flow';
import NotFound from '../views/NoPage';

const AuthRoutes = () => {
  return (
    <>
      <Route path='/' element={<Flow />} />
      <Route path='*' element={<NotFound />} />
    </>
  );
};

export default AuthRoutes;
