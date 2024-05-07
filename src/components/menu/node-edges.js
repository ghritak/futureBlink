export const initialNodes = [
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

export const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
