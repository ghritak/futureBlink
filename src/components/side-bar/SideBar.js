import React from 'react';
import ProfileComponent from './ProfileComponent';
import DraggableComponent from './DraggableComponent';
import CompanyComponent from './CompanyComponent';

const SideBar = () => {
  return (
    <div className='px-6 space-y-4 pt-6 h-screen flex flex-col'>
      <div className='mb-auto'>
        <CompanyComponent />
        <DraggableComponent />
      </div>
      <ProfileComponent />
    </div>
  );
};

export default SideBar;
