import React from 'react';
import Loader from '../components/ui-components/loader/Loader';

const LoaderView = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <Loader size='70' color='#818cf8' />
    </div>
  );
};

export default LoaderView;
