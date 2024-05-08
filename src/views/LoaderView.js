import React from 'react';
import Loader from '../components/ui-components/loader/Loader';

const LoaderView = () => {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <Loader size='70' color='#818cf8' />
    </div>
  );
};

export default LoaderView;
