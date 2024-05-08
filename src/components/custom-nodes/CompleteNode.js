import React, { memo } from 'react';
import { FaCircleCheck } from 'react-icons/fa6';
import { Handle, Position } from 'reactflow';

const CompleteNode = (data) => {
  const { label } = data;
  return (
    <div className='flex bg-white p-3 border-[1px] rounded-md capitalize min-w-56 hover:shadow-md transition-all duration-300'>
      <div className='p-2 border-[1px] border-[#27c027] rounded-md bg-[#c2e7c2]'>
        <FaCircleCheck color='#27c027' size={30} />
      </div>
      <div className='pl-2'>
        <h2 className='font-bold font-sans'>{label || 'Complete'}</h2>
        <p>Task Completed</p>
      </div>
      <Handle type='target' position={Position.Top} />
      <Handle type='source' position={Position.Bottom} />
    </div>
  );
};

export default memo(CompleteNode);
