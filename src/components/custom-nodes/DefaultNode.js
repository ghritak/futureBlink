/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect, useState } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';

const DefaultNode = (props) => {
  const {
    id,
    data: { label },
  } = props;
  const [title, setTitile] = useState(label);

  const { setNodes } = useReactFlow();

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          node.data = {
            ...node.data,
            label: title,
          };
        }
        return node;
      })
    );
  }, [title]);

  return (
    <div className='flex bg-white p-2 border-[1px] rounded-md capitalize min-w-40 justify-center hover:shadow-md transition-all duration-300'>
      <input
        value={title}
        className='px-1 outline-[#818cf8] text-center'
        onChange={(e) => setTitile(e.target.value)}
      />
      <Handle type='target' position={Position.Top} />
      <Handle type='source' position={Position.Bottom} />
    </div>
  );
};

export default memo(DefaultNode);
