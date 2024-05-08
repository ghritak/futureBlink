import React from 'react';

const Button = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className='py-2 px-6 bg-blue-500 rounded-md hover:bg-blue-600 transition-all duration-300 text-white'
    >
      Save
    </button>
  );
};

export default Button;
