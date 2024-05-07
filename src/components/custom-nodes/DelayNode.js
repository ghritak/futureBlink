import React, { memo } from 'react';
import { HiOutlineClock } from 'react-icons/hi';
import { Handle, Position } from 'reactflow';

const DelayNode = ({ data }) => {
  const { days, label } = data;

  return (
    <div className='flex bg-white p-3 border-[1px] rounded-md capitalize min-w-56'>
      <div className='p-2 border-[1px] border-[#01a7ff] rounded-md bg-[#eaf1f7]'>
        <HiOutlineClock color='#01a7ff' size={30} />
      </div>
      <div className='pl-2'>
        <h2 className='font-bold font-sans'>{label}</h2>
        <p>Wait: {days || 0} Days</p>
      </div>
      <Handle type='target' position={Position.Top} />
      <Handle type='source' position={Position.Bottom} />
    </div>
  );
};

export default memo(DelayNode);
