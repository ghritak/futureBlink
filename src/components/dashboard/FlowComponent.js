/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useCallback, useRef, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
} from 'reactflow';
import DefaultNode from '../custom-nodes/DefaultNode';
import EmailNode from '../custom-nodes/EmailNode';
import DelayNode from '../custom-nodes/DelayNode';
import CompleteNode from '../custom-nodes/CompleteNode';
import { capitalizeString, generateContent } from '../../utils';
import ContextMenu from '../menu/ContextMenu';
import Button from '../ui-components/button/Button';
import 'reactflow/dist/style.css';
import '../menu/style.css';

// const initialNodes = [
//   {
//     id: '1',
//     position: { x: 0, y: 0 },
//     data: {
//       label: 'Email',
//       content: 'This is email content',
//     },
//     type: 'email',
//   },
//   {
//     id: '2',
//     position: { x: 100, y: 200 },
//     data: { label: 'Delay', content: 'Wait 4 days' },
//     type: 'delay',
//   },
//   {
//     id: '3',
//     position: { x: 0, y: 400 },
//     data: { label: 'Another Delay', content: 'Wait 0 day' },
//     type: 'delay',
//   },
// ];

// const initialEdges = [
//   { id: 'e1-2', source: '1', target: '2' },
//   { id: 'e2-3', source: '2', target: '3' },
// ];

const nodeTypes = {
  defaultNode: DefaultNode,
  email: EmailNode,
  delay: DelayNode,
  complete: CompleteNode,
};

const generateNodeId = () => `${Date.now()}`;

const FlowComponent = ({ flowData }) => {
  console.log(
    'flowData',
    flowData?.nodes,
    typeof flowData?.nodes,
    typeof [1, 2, 3]
  );
  const [nodes, setNodes, onNodesChange] = useNodesState(flowData?.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(flowData?.edges);
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
      if (JSON.stringify(nodes) !== JSON.stringify(flowData?.nodes)) {
        setShowSaveButton(true);
        count.current += 1;
      }
    }
    onNodesChange(e);
  };

  return (
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
        <div className=''>
          <ContextMenu onClick={onPaneClick} {...menu} />
        </div>
      )}
      {showSaveButton && (
        <div className='absolute right-0 m-5 z-50'>
          <Button onClick={updateFlowChart} />
        </div>
      )}
    </ReactFlow>
  );
};

export default FlowComponent;
