/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect, useState } from 'react';
import { FaCircleCheck } from 'react-icons/fa6';
import { Handle, Position, useReactFlow } from 'reactflow';

const CompleteNode = (props) => {
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
    <div className='flex bg-white p-3 border-[1px] rounded-md capitalize min-w-56 hover:shadow-md transition-all duration-300'>
      <div className='p-2 border-[1px] border-[#27c027] rounded-md bg-[#c2e7c2]'>
        <FaCircleCheck color='#27c027' size={30} />
      </div>
      <div className='pl-2'>
        <div className='flex flex-col'>
          <input
            value={title}
            className='font-bold font-sans mb-1 px-1 outline-[#8929e0]'
            onChange={(e) => setTitile(e.target.value)}
          />
          <input
            value={para}
            className='px-1 outline-[#8929e0]'
            onChange={(e) => setPara(e.target.value)}
          />
        </div>
      </div>
      <Handle type='target' position={Position.Top} />
      <Handle type='source' position={Position.Bottom} />
    </div>
  );
};

export default memo(CompleteNode);
