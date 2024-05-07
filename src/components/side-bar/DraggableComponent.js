import React from 'react';
import { HiOutlineClock, HiOutlineMail } from 'react-icons/hi';

const DraggableComponent = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className='space-y-4'>
      <div className='description'>You can drag these nodes to the right.</div>

      <div className='space-y-4'>
        <div
          className='rounded-md cursor-grab'
          onDragStart={(event) => onDragStart(event, 'defaultNode')}
          draggable
        >
          <div className='flex bg-white p-3 justify-center border-[1px] rounded-md'>
            <p className='font-semibold'>Default</p>
          </div>
        </div>

        <div
          className='rounded-md cursor-grab'
          onDragStart={(event) => onDragStart(event, 'email')}
          draggable
        >
          <div className='flex bg-white p-3 border-[1px] rounded-md'>
            <div className='p-2 border-[1px] border-[#8929e0] rounded-md bg-[#e3ccf8]'>
              <HiOutlineMail color='#8929e0' size={30} />
            </div>
            <div className='pl-2'>
              <h2 className='font-bold font-sans'>Email</h2>
              <p>Template: Signal</p>
            </div>
          </div>
        </div>

        <div
          className='rounded-md cursor-grab'
          onDragStart={(event) => onDragStart(event, 'delay')}
          draggable
        >
          <div className='flex bg-white p-3 border-[1px] rounded-md'>
            <div className='p-2 border-[1px] border-[#01a7ff] rounded-md bg-[#eaf1f7]'>
              <HiOutlineClock color='#01a7ff' size={30} />
            </div>
            <div className='pl-2'>
              <h2 className='font-bold font-sans'>Delay</h2>
              <p>Wait: 1 Day</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraggableComponent;
