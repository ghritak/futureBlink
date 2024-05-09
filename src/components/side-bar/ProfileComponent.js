import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { IoLogOutOutline } from 'react-icons/io5';

const ProfileComponent = ({ user }) => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className='mt-auto pb-6 space-y-4'>
      <div className='flex items-start bg-white p-3 border-[1px] rounded-md'>
        <div className='p-2 rounded-md bg-gray-300'>
          <AiOutlineUser color='white' size={30} />
        </div>
        <div className='pl-2'>
          <h2 className='font-bold font-sans'>{user?.name}</h2>
          <p>{user?.email}</p>
        </div>
      </div>
      <div
        onClick={handleLogout}
        className='flex bg-white p-3 border-[1px] rounded-md items-center cursor-pointer transition-all duration-300 hover:bg-gray-100'
      >
        <IoLogOutOutline size={24} color='red' />
        <p className='pl-2 font-semibold'>Log Out</p>
      </div>
    </div>
  );
};

export default ProfileComponent;
