/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useRef, useState } from 'react';
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
import ContextMenu from './menu/ContextMenu';

import './menu/style.css';

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
  const [menu, setMenu] = useState(null);
  const ref = useRef(null);

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

  const onNodeContextMenu = useCallback(
    (event, node) => {
      event.preventDefault();
      const pane = ref.current.getBoundingClientRect();
      console.log(event.clientX);
      setMenu({
        id: node.id,
        top: event.clientY < pane.height - 200 && event.clientY,
        left: event.clientX < pane.width && event.clientX - 336,
        right: event.clientX >= pane.width - 200 && pane.width - event.clientX,
        bottom:
          event.clientY >= pane.height - 200 && pane.height - event.clientY,
      });
    },
    [setMenu]
  );

  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

  return (
    <div className='w-screen h-screen bg-gray-300 flex'>
      <div className='h-screen w-1/5 bg-white'>
        <SideBar />
      </div>
      <div className='h-screen w-4/5'>
        <ReactFlow
          ref={ref}
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onPaneClick={onPaneClick}
          onNodeContextMenu={onNodeContextMenu}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
          {menu && (
            <div className='bg-red-300'>
              <ContextMenu onClick={onPaneClick} {...menu} />
            </div>
          )}
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
