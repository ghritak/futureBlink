import React from 'react';
import Loader from '../loader/Loader';

const GradientButton = ({ title, disabled, loading }) => {
  return (
    <div className='flex items-center justify-center'>
      <button
        disabled={disabled}
        className={`bg-gradient-to-r from-indigo-300 to-indigo-500 w-full hover:scale-95 text-white font-bold h-12 rounded-full focus:outline-none focus:shadow-outline transition-all duration-300 ${
          disabled ? 'opacity-50' : ''
        }`}
        type='submit'
      >
        {!loading ? title : <Loader color='white' />}
      </button>
    </div>
  );
};

export default GradientButton;
