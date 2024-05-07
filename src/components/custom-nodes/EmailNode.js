import React, { memo } from 'react';
import { HiOutlineMail } from 'react-icons/hi';
import { Handle, Position } from 'reactflow';

const EmailNode = ({ data }) => {
  const { label } = data;
  return (
    <div className='flex bg-white p-3 border-[1px] rounded-md capitalize min-w-56 hover:shadow-md transition-all duration-300'>
      <div className='p-2 border-[1px] border-[#8929e0] rounded-md bg-[#e3ccf8]'>
        <HiOutlineMail color='#8929e0' size={30} />
      </div>
      <div className='pl-2'>
        <h2 className='font-bold font-sans'>{label}</h2>
        <p>Template: Signal</p>
      </div>
      <Handle type='target' position={Position.Top} />
      <Handle type='source' position={Position.Bottom} />
    </div>
  );
};

export default memo(EmailNode);
