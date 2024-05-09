import React, { useContext } from 'react';
import { CiCircleCheck } from 'react-icons/ci';
import { UserContext } from '../../../context/UserContext';
import { IoClose } from 'react-icons/io5';

const Toast = () => {
  const { toast, setToast } = useContext(UserContext);

  const hideToast = () => {
    setToast({ visibility: false });
  };

  if (!toast?.visibility) return null;

  return (
    <div
      className='fixed sm:absolute bottom-10 left-0 sm:left-10 right-0 sm:right-auto flex justify-center'
      style={{ zIndex: 1000 }}
    >
      <div
        className='relative p-3 md:p-4 flex items-center rounded-lg w-80 bg-[#242d3a] text-white'
        style={{ zIndex: 1000 }}
      >
        <div>
          <CiCircleCheck color='#4BE83F' size={24} />
        </div>
        <div className='ml-3'>
          <p className='text-sm'>{toast?.text}</p>
        </div>
        <div
          onClick={hideToast}
          className='absolute right-3 cursor-pointer hover:bg-[#323d4d] transition-all duration-300 rounded-full p-1'
        >
          <IoClose size={20} />
        </div>
      </div>
    </div>
  );
};

export default Toast;
