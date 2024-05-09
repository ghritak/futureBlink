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
import {
  capitalizeString,
  generateContent,
  generateNodeId,
  getMenuLeftPosition,
} from '../../utils';
import ContextMenu from '../menu/ContextMenu';
import Button from '../ui-components/button/Button';
import 'reactflow/dist/style.css';
import '../menu/style.css';
import useToast from '../../hooks/useToast';

const nodeTypes = {
  defaultNode: DefaultNode,
  email: EmailNode,
  delay: DelayNode,
  complete: CompleteNode,
};

const FlowComponent = ({ flowData, user: { token } }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(flowData?.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(flowData?.edges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [menu, setMenu] = useState(null);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [isSaving, setSaving] = useState(false);
  const ref = useRef(null);
  const count = useRef(0);

  const showToast = useToast();

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
          label: capitalizeString(type === 'defaultNode' ? 'Default' : type),
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
      const menuPosition = {
        id: node.id,
        top: event.clientY < pane.height - 200 && event.clientY,
        left: getMenuLeftPosition(event, pane),
        right: event.clientX >= pane.width - 200 && pane.width - event.clientX,
        bottom:
          event.clientY >= pane.height - 200 && pane.height - event.clientY,
      };
      setMenu(menuPosition);
    },
    [setMenu]
  );

  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

  const handleNodeChange = (e) => {
    if (count.current === 0) {
      if (JSON.stringify(nodes) !== JSON.stringify(flowData?.nodes)) {
        setShowSaveButton(true);
        count.current += 1;
      }
    }
    onNodesChange(e);
  };

  const handleEdgeChange = (e) => {
    if (count.current === 0) {
      if (JSON.stringify(nodes) !== JSON.stringify(flowData?.nodes)) {
        setShowSaveButton(true);
        count.current += 1;
      }
    }
    onEdgesChange(e);
  };

  const updateFlowChart = async () => {
    try {
      setSaving(true);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/flow/updateFlow`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify({ nodes, edges }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log(data?.message);
        count.current = 0;
      } else {
        console.log(data?.error);
      }
      count.current = 0;
      setSaving(false);
      showToast('normal', 'Flow updated succesfully.');
    } catch (err) {
      console.log('Could not update flow data', err);
      setSaving(false);
    }
  };

  return (
    <>
      <ReactFlow
        ref={ref}
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={handleNodeChange}
        onEdgesChange={handleEdgeChange}
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
          <div className='absolute right-0 m-5 z-10'>
            <Button
              onClick={updateFlowChart}
              title={'Save'}
              loading={isSaving}
            />
          </div>
        )}
      </ReactFlow>
    </>
  );
};

export default FlowComponent;
