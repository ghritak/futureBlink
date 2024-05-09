import React from 'react';
import Loader from '../loader/Loader';

const Button = ({ title, onClick, loading }) => {
  return (
    <button
      onClick={onClick}
      className='h-10 w-24 bg-[#818cf8] rounded-md hover:bg-[#6a75d6] transition-all duration-300 text-white'
    >
      {!loading ? title : <Loader size='16' color='white' />}
    </button>
  );
};

export default Button;
