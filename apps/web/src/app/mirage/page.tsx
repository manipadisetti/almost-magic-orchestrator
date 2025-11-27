'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Button } from '@thinair/ui';
import { trpc } from '../../utils/trpc';

// Custom Node Components
const EntityNode = ({ data }) => {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-purple-800 border-2 border-purple-500 min-w-[150px]">
      <div className="font-bold text-lg text-white">{data.label}</div>
      {data.fields && data.fields.length > 0 && (
        <div className="mt-2">
          <div className="text-xs font-semibold text-purple-200">Fields:</div>
          <ul className="text-sm text-white">
            {data.fields.map((field, index) => (
              <li key={index} className="flex items-center">
                <span>{field.name}</span>
                <span className="ml-1 text-xs text-purple-300">({field.type})</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const FeatureNode = ({ data }) => {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-blue-800 border-2 border-blue-500 min-w-[150px]">
      <div className="font-bold text-lg text-white">{data.label}</div>
      {data.description && (
        <div className="mt-1 text-sm text-blue-200">{data.description}</div>
      )}
    </div>
  );
};

const ProjectNode = ({ data }) => {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-gray-800 border-2 border-gray-500 min-w-[180px]">
      <div className="font-bold text-xl text-white text-center">{data.label}</div>
    </div>
  );
};

export default function MiragePage() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get('projectId') || 'demo';
  
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [projectData, setProjectData] = useState(null);
  
  const getGraph = trpc.mirage.getGraph.useQuery({ projectId }, {
    enabled: !!projectId,
    onSuccess: (data) => {
      setNodes(data.nodes);
      setEdges(data.edges);
      setProjectData(data.projectData);
    },
  });
  
  const updateGraph = trpc.mirage.updateGraph.useMutation();
  
  const handleSave = useCallback(() => {
    if (projectId && nodes.length > 0) {
      updateGraph.mutate({
        projectId,
        nodes,
        edges,
        projectData,
      });
    }
  }, [projectId, nodes, edges, projectData, updateGraph]);
  
  const nodeTypes = {
    entity: EntityNode,
    feature: FeatureNode,
    project: ProjectNode,
  };
  
  if (getGraph.isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-xl">Loading project visualisation...</p>
          <p className="text-sm mt-2">Please wait while we prepare your project canvas.</p>
        </div>
      </div>
    );
  }
  
  if (getGraph.isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center text-red-500">
          <p className="text-xl">Error loading project</p>
          <p className="text-sm mt-2">{getGraph.error.message}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="h-screen w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
        
        <Panel position="top-right">
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleSave}
              disabled={updateGraph.isPending}
            >
              {updateGraph.isPending ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button variant="glow" size="sm">
              Finalise Design
            </Button>
          </div>
        </Panel>
        
        <Panel position="top-left">
          <div className="bg-gray-800/70 p-3 rounded-md">
            <h2 className="text-xl font-bold text-blue-400">Mirage Studio</h2>
            <p className="text-sm text-gray-300">
              Visualise and customise your application structure
            </p>
          </div>
        </Panel>
      </ReactFlow>
      
      {updateGraph.isSuccess && (
        <div className="absolute bottom-4 right-4 bg-green-800/70 text-green-200 px-4 py-2 rounded-md">
          Changes saved successfully!
        </div>
      )}
    </div>
  );
}
'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Button } from '@thinair/ui';
import { trpc } from '../../utils/trpc';

// Custom Node Components
const EntityNode = ({ data }) => {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-purple-800 border-2 border-purple-500 min-w-[150px]">
      <div className="font-bold text-lg text-white">{data.label}</div>
      {data.fields && data.fields.length > 0 && (
        <div className="mt-2">
          <div className="text-xs font-semibold text-purple-200">Fields:</div>
          <ul className="text-sm text-white">
            {data.fields.map((field, index) => (
              <li key={index} className="flex items-center">
                <span>{field.name}</span>
                <span className="ml-1 text-xs text-purple-300">({field.type})</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const FeatureNode = ({ data }) => {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-blue-800 border-2 border-blue-500 min-w-[150px]">
      <div className="font-bold text-lg text-white">{data.label}</div>
      {data.description && (
        <div className="mt-1 text-sm text-blue-200">{data.description}</div>
      )}
    </div>
  );
};

const ProjectNode = ({ data }) => {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-gray-800 border-2 border-gray-500 min-w-[180px]">
      <div className="font-bold text-xl text-white text-center">{data.label}</div>
    </div>
  );
};

export default function MiragePage() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get('projectId') || 'demo';
  
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [projectData, setProjectData] = useState(null);
  
  const getGraph = trpc.mirage.getGraph.useQuery({ projectId }, {
    enabled: !!projectId,
    onSuccess: (data) => {
      setNodes(data.nodes);
      setEdges(data.edges);
      setProjectData(data.projectData);
    },
  });
  
  const updateGraph = trpc.mirage.updateGraph.useMutation();
  
  const handleSave = useCallback(() => {
    if (projectId && nodes.length > 0) {
      updateGraph.mutate({
        projectId,
        nodes,
        edges,
        projectData,
      });
    }
  }, [projectId, nodes, edges, projectData, updateGraph]);
  
  const nodeTypes = {
    entity: EntityNode,
    feature: FeatureNode,
    project: ProjectNode,
  };
  
  if (getGraph.isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-xl">Loading project visualisation...</p>
          <p className="text-sm mt-2">Please wait while we prepare your project canvas.</p>
        </div>
      </div>
    );
  }
  
  if (getGraph.isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center text-red-500">
          <p className="text-xl">Error loading project</p>
          <p className="text-sm mt-2">{getGraph.error.message}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="h-screen w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
        
        <Panel position="top-right">
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleSave}
              disabled={updateGraph.isPending}
            >
              {updateGraph.isPending ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button variant="glow" size="sm">
              Finalise Design
            </Button>
          </div>
        </Panel>
        
        <Panel position="top-left">
          <div className="bg-gray-800/70 p-3 rounded-md">
            <h2 className="text-xl font-bold text-blue-400">Mirage Studio</h2>
            <p className="text-sm text-gray-300">
              Visualise and customise your application structure
            </p>
          </div>
        </Panel>
      </ReactFlow>
      
      {updateGraph.isSuccess && (
        <div className="absolute bottom-4 right-4 bg-green-800/70 text-green-200 px-4 py-2 rounded-md">
          Changes saved successfully!
        </div>
      )}
    </div>
  );
}
