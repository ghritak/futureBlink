import React, { useCallback } from 'react';
import { useReactFlow } from 'reactflow';
import { GoCopy } from 'react-icons/go';
import { AiOutlineDelete } from 'react-icons/ai';

export default function ContextMenu({
  id,
  top,
  left,
  right,
  bottom,
  ...props
}) {
  const { getNode, setNodes, addNodes, setEdges } = useReactFlow();
  const duplicateNode = useCallback(() => {
    const node = getNode(id);
    const position = {
      x: node.position.x + 50,
      y: node.position.y + 50,
    };

    addNodes({
      ...node,
      selected: false,
      dragging: false,
      id: `${node.id}-copy`,
      position,
    });
  }, [id, getNode, addNodes]);

  const deleteNode = useCallback(() => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.source !== id));
  }, [id, setNodes, setEdges]);
  console.log(top, left, right, bottom, 'humm');
  return (
    <div
      style={{ top, left, right, bottom }}
      {...props}
      className='context-menu w-40 shadow-lg'
    >
      <div
        className='w-40 max-w-40 bg-[#f6f6f6] hover:bg-gray-200 flex items-center p-2 cursor-pointer transition-all duration-300'
        onClick={duplicateNode}
      >
        <GoCopy />
        <p className='pl-2'>Duplicate</p>
      </div>
      <div
        className='w-40 max-w-40 bg-[#f6f6f6] hover:bg-gray-200 flex items-center p-2 cursor-pointer transition-all duration-300'
        onClick={deleteNode}
      >
        <AiOutlineDelete />
        <p className='pl-2'>Delete</p>
      </div>
    </div>
  );
}
