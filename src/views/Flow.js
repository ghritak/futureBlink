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

// import './components/menu/style.css';
import CompleteNode from '../components/custom-nodes/CompleteNode';
import DelayNode from '../components/custom-nodes/DelayNode';
import EmailNode from '../components/custom-nodes/EmailNode';
import DefaultNode from '../components/custom-nodes/DefaultNode';
import { capitalizeString, generateContent } from '../utils';
import SideBar from '../components/side-bar/SideBar';
import ContextMenu from '../components/menu/ContextMenu';
import Button from '../components/ui-components/button/Button';

const initialNodes = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    data: {
      label: 'Email',
      content: 'This is email content',
      isEditMode: false,
    },
    type: 'email',
  },
  {
    id: '2',
    position: { x: 100, y: 200 },
    data: { label: 'Delay', content: 'Wait 4 days', isEditMode: false },
    type: 'delay',
  },
  {
    id: '3',
    position: { x: 0, y: 400 },
    data: { label: 'Another Delay', content: 'Wait 0 day', isEditMode: false },
    type: 'delay',
  },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

const nodeTypes = {
  defaultNode: DefaultNode,
  email: EmailNode,
  delay: DelayNode,
  complete: CompleteNode,
};

const generateNodeId = () => `${Date.now()}`;

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [menu, setMenu] = useState(null);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const ref = useRef(null);
  const count = useRef(0);

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
        id: generateNodeId(),
        type,
        position,
        data: {
          label: capitalizeString(type),
          content: generateContent(type),
          isEditMode: false,
        },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const onNodeContextMenu = useCallback(
    (event, node) => {
      event.preventDefault();
      const pane = ref.current.getBoundingClientRect();

      setMenu({
        id: node.id,
        top: event.clientY < pane.height - 200 && event.clientY,
        left:
          event.clientX < pane.width && event.clientX - window.innerWidth / 5,
        right: event.clientX >= pane.width - 200 && pane.width - event.clientX,
        bottom:
          event.clientY >= pane.height - 200 && pane.height - event.clientY,
      });
    },
    [setMenu]
  );

  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

  const updateFlowChart = () => {
    console.log('These are the saved nodes', nodes);
  };

  const handleNodeChange = (e) => {
    if (count.current === 0) {
      if (JSON.stringify(nodes) !== JSON.stringify(initialNodes)) {
        setShowSaveButton(true);
        count.current += 1;
      }
    }
    onNodesChange(e);
  };

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
          onNodesChange={handleNodeChange}
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
          {showSaveButton && (
            <div className='absolute right-0 m-5 z-50'>
              <Button onClick={updateFlowChart} />
            </div>
          )}
        </ReactFlow>
      </div>
    </div>
  );
};

export default Flow;
