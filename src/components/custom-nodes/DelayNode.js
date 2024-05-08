/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect, useState } from 'react';
import { HiOutlineClock } from 'react-icons/hi';
import { Handle, Position, useReactFlow } from 'reactflow';

const DelayNode = (props) => {
  const {
    id,
    data: { label, content },
  } = props;
  const [title, setTitile] = useState(label);
  const [para, setPara] = useState(content);
  const { setNodes } = useReactFlow();

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          node.data = {
            ...node.data,
            label: title,
            content: para,
          };
        }
        return node;
      })
    );
  }, [title, para]);

  return (
    <div className='flex items-start bg-white p-3 border-[1px] rounded-md capitalize min-w-56 hover:shadow-md transition-all duration-300'>
      <div className='p-2 border-[1px] border-[#01a7ff] rounded-md bg-[#eaf1f7]'>
        <HiOutlineClock color='#01a7ff' size={30} />
      </div>
      <div className='pl-2'>
        <div className='flex flex-col'>
          <input
            autoFocus
            value={title}
            className='font-bold font-sans mb-1 px-1 outline-[#01a7ff]'
            onChange={(e) => setTitile(e.target.value)}
          />
          <input
            value={para}
            className='px-1 outline-[#01a7ff]'
            onChange={(e) => setPara(e.target.value)}
          />
        </div>
      </div>
      <Handle type='target' position={Position.Top} />
      <Handle type='source' position={Position.Bottom} />
    </div>
  );
};

export default memo(DelayNode);
