'use client';

import { useState } from 'react';
import { Button } from '@thinair/ui';
import { trpc } from '../../utils/trpc';
import Link from 'next/link';
import Link from 'next/link';

export default function VaporPage() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<any>(null);
  
  const inhale = trpc.vapor.inhale.useMutation({
    onSuccess: (data) => {
      setResult(data.intentJson);
    },
  });

  const handleSubmit = () => {
    if (!input.trim()) return;
    
    inhale.mutate({
      content: input,
      userId: 'demo-user', // In a real app, this would come from auth
      name: undefined
    });
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-6">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            <span className="text-[#3b82f6]">Vapor</span> Studio
          </h1>
          <p className="text-lg text-gray-300 mt-2">
            Describe your application and we'll materialise it for you
          </p>
        </div>
        
        <div className="bg-gray-800/50 rounded-lg p-6 shadow-lg border border-gray-700">
          <textarea
            className="w-full h-40 p-4 bg-gray-900 text-white rounded-md border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            placeholder="Describe your application in detail. For example: 'I need a task management app with user authentication, task categories, due dates, and email notifications for Australian users.'"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          
          <div className="mt-4 flex justify-end">
            <Button 
              variant="glow" 
              size="lg" 
              onClick={handleSubmit}
              disabled={inhale.isPending || !input.trim()}
            >
              {inhale.isPending ? 'Materialising...' : 'Materialise'}
            </Button>
          </div>
        </div>
        
        {inhale.isPending && (
          <div className="bg-gray-800/50 rounded-lg p-6 shadow-lg border border-gray-700 text-center">
            <div className="animate-pulse text-blue-400">
              <p className="text-lg">AI is analysing your requirements...</p>
              <p className="text-sm mt-2">This may take a few moments. We're optimising your solution.</p>
            </div>
          </div>
        )}
        
        {result && (
          <div className="bg-gray-800/50 rounded-lg p-6 shadow-lg border border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">Project Plan</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium">Project Name</h3>
                <p className="text-gray-300">{result.project_name}</p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium">Tech Stack</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {Array.isArray(result.tech_stack) ? (
                    result.tech_stack.map((tech: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full text-sm">
                        {tech}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-300">{JSON.stringify(result.tech_stack)}</p>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-medium">Entities</h3>
                <pre className="bg-gray-900 p-4 rounded-md overflow-auto mt-2 text-sm">
                  {JSON.stringify(result.entities, null, 2)}
                </pre>
              </div>
              
              <div>
                <h3 className="text-xl font-medium">Features</h3>
                <pre className="bg-gray-900 p-4 rounded-md overflow-auto mt-2 text-sm">
                  {JSON.stringify(result.features, null, 2)}
                </pre>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button variant="outline" size="default">
                Customise Plan
              </Button>
              <Link href={`/mirage?projectId=${result.project_id || 'demo'}`}>
                <Button variant="glow" size="default" className="ml-4">
                  Materialise Code
                </Button>
              </Link>
            </div>
          </div>
        )}
        
        {inhale.isError && (
          <div className="bg-red-900/30 text-red-300 p-4 rounded-lg border border-red-800">
            <p className="font-medium">Error: {inhale.error.message || 'Failed to process your request'}</p>
          </div>
        )}
      </div>
    </div>
  );
}
