import React from 'react';
import { Terminal } from 'lucide-react';

export const CodingLabs: React.FC = () => {
  return (
    <div className="pt-40 pb-20 px-4 min-h-screen flex flex-col items-center justify-center text-center">
      <div className="mb-6 p-4 rounded-full bg-white/5">
        <Terminal className="w-12 h-12 text-brand-yellow" />
      </div>
      <h1 className="text-5xl font-bold text-white mb-6">Coding Labs</h1>
      <p className="text-xl text-gray-400 max-w-2xl">
        Hands-on practice environments to build real-world skills.
      </p>
      <div className="mt-8 p-4 border border-dashed border-white/20 rounded-lg bg-white/5">
        <span className="text-brand-yellow font-mono">Page content coming soon...</span>
      </div>
    </div>
  );
};