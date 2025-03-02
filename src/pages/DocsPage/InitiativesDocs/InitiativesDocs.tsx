import { ReactFlow } from '@xyflow/react';

import '@xyflow/react/dist/style.css';

const initialNodes = [
  {
    id: '10',
    position: { x: 0, y: 0 },
    data: { label: 'Entrada', style: { backgroundColor: 'blue' } },
  },
  {
    id: '20',
    position: { x: 0, y: 100 },
    data: { label: 'Admissão', style: { backgroundColor: 'blue' } },
  },
  {
    id: '21',
    position: { x: -300, y: 650 },
    data: { label: 'Inadmissível', style: { backgroundColor: 'red' } },
  },
  {
    id: '30',
    position: { x: 0, y: 200 },
    data: {
      label: 'Votação (Generalidade)',
      style: { backgroundColor: 'green' },
    },
  },
  {
    id: '40',
    position: { x: 0, y: 300 },
    data: {
      label: 'Votação (Especialidade)',
      style: { backgroundColor: 'green' },
    },
  },
  {
    id: '50',
    position: { x: 0, y: 400 },
    data: {
      label: 'Votação Final Global',
      style: { backgroundColor: 'green' },
    },
  },
  {
    id: '70',
    position: { x: 100, y: 550 },
    data: { label: 'Promulgação', style: { backgroundColor: 'gray' } },
  },
  {
    id: '71',
    position: { x: 300, y: 450 },
    data: { label: 'Veto (PR)', style: { backgroundColor: 'red' } },
  },
  {
    id: '72',
    position: { x: 300, y: 550 },
    data: {
      label: 'Reapreciação do Veto',
      style: { backgroundColor: 'green' },
    },
  },
  {
    id: '80',
    position: { x: 300, y: 650 },
    data: { label: 'Publicação da Lei', style: { backgroundColor: 'gray' } },
  },
  {
    id: '90',
    position: { x: -150, y: 650 },
    data: { label: 'Rejeitado', style: { backgroundColor: 'gray' } },
  },
  {
    id: '91',
    position: { x: 0, y: 650 },
    data: { label: 'Retirado', style: { backgroundColor: 'gray' } },
  },
  {
    id: '92',
    position: { x: 150, y: 650 },
    data: { label: 'Caducado', style: { backgroundColor: 'gray' } },
  },
];
const initialEdges = [
  { id: 'e10-20', source: '10', target: '20' },
  { id: 'e20-21', source: '20', target: '21' },
  { id: 'e20-30', source: '20', target: '30' },
  { id: 'e20-40', source: '20', target: '40' },
  { id: 'e20-91', source: '20', target: '91' },
  { id: 'e30-40', source: '30', target: '40' },
  { id: 'e30-90', source: '30', target: '90' },
  { id: 'e40-50', source: '40', target: '50' },
  { id: 'e40-92', source: '40', target: '92' },
  { id: 'e50-70', source: '50', target: '70' },
  { id: 'e50-71', source: '50', target: '71' },
  { id: 'e50-90', source: '50', target: '90' },
  { id: 'e71-72', source: '71', target: '72' },
  { id: 'e72-70', source: '72', target: '70' },
  { id: 'e72-90', source: '72', target: '90' },
  { id: 'e70-80', source: '70', target: '80' },
];

const InitiativesDocs = () => {
  return (
    <div className="w-full h-full flex flex-col p-5 justify-baseline overflow-y-auto overflow-x-hidden">
      <h1 className="text-2xl font-bold mb-4">Initiatives Docs</h1>

      <ReactFlow nodes={initialNodes} edges={initialEdges} />
    </div>
  );
};

export default InitiativesDocs;
