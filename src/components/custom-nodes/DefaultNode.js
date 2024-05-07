import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

const DefaultNode = (data) => {
  const { label } = data;
  return (
    <div className='flex bg-white p-2 border-[1px] rounded-md capitalize min-w-40 justify-center'>
      <p className='font-semibold'>{label || 'Default'}</p>
      <Handle type='target' position={Position.Top} />
      <Handle type='source' position={Position.Bottom} />
    </div>
  );
};

export default memo(DefaultNode);
