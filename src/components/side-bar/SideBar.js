import React, { useState } from 'react';
import ProfileComponent from './ProfileComponent';
import DraggableComponent from './DraggableComponent';
import CompanyComponent from './CompanyComponent';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';

const SideBar = ({ user }) => {
  const [isMenuVisible, setMenuVisible] = useState(false);

  return (
    <>
      <div
        onClick={() => {
          setMenuVisible(!isMenuVisible);
          console.log(isMenuVisible);
        }}
        className='absolute m-4 p-2 lg:hidden z-40'
      >
        <HiOutlineMenuAlt2 size={30} />
      </div>
      <div
        className={`h-screen absolute z-50 ${
          isMenuVisible ? 'left-0 w-screen' : '-left-80'
        } lg:left-0  lg:relative lg:w-1/4 xl:w-1/5  transition-all duration-300 flex flex-row`}
      >
        <div className='px-3 xl:px-6 w-2/3 lg:w-full bg-white space-y-4 pt-6 h-screen flex flex-col'>
          <div className='mb-auto'>
            <CompanyComponent />
            <DraggableComponent setMenuVisible={setMenuVisible} />
          </div>
          <ProfileComponent user={user} />
        </div>
        <div
          onClick={() => {
            setMenuVisible(!isMenuVisible);
          }}
          className={`h-screen w-1/3 sm:w-full lg:w-0 transition-opacity duration-1500 ${
            isMenuVisible ? 'bg-black opacity-100 bg-opacity-25' : 'opacity-0'
          }`}
        ></div>
      </div>
    </>
  );
};

export default SideBar;
