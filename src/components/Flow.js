/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
} from 'reactflow';

import 'reactflow/dist/style.css';
import EmailNode from './custom-nodes/EmailNode';
import DelayNode from './custom-nodes/DelayNode';
import SideBar from './side-bar/SideBar';
import DefaultNode from './custom-nodes/DefaultNode';

const initialNodes = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    data: { label: 'Email' },
    type: 'email',
  },
  {
    id: '2',
    position: { x: 100, y: 200 },
    data: { label: 'Delay', days: 4 },
    type: 'delay',
  },
  {
    id: '3',
    position: { x: 0, y: 400 },
    data: { label: 'Another Delay' },
    type: 'delay',
  },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

const nodeTypes = {
  defaultNode: DefaultNode,
  email: EmailNode,
  delay: DelayNode,
};

let id = 0;
const getId = () => `dndnode_${id++}`;

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: type },
      };
      console.log(type);

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  return (
    <div className='w-screen h-screen bg-gray-300 flex'>
      <div className='h-screen w-1/5 bg-white'>
        <SideBar />
      </div>
      <div className='h-screen w-4/5'>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
          <div className='absolute right-0 m-5 z-50'>
            <div className='py-2 px-6 bg-blue-500 rounded-md hover:bg-blue-600 transition-all duration-300 text-white cursor-pointer'>
              Save
            </div>
          </div>
        </ReactFlow>
      </div>
    </div>
  );
};

export default Flow;
