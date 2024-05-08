import React from 'react';
import Loader from '../loader/Loader';

const Button = ({ title, onClick, loading }) => {
  return (
    <button
      onClick={onClick}
      className='h-10 w-24 bg-blue-500 rounded-md hover:bg-blue-600 transition-all duration-300 text-white'
    >
      {!loading ? title : <Loader size='16' color='white' />}
    </button>
  );
};

export default Button;
