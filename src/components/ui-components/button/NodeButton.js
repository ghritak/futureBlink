import React from 'react';

const NodeButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className='px-3 py-1 text-sm bg-blue-500 rounded-md hover:bg-blue-600 transition-all duration-300 text-white'
    >
      Save
    </button>
  );
};

export default NodeButton;
