import React from 'react';
import { Crown } from 'lucide-react';

export const Membership: React.FC = () => {
  return (
    <div className="pt-40 pb-20 px-4 min-h-screen flex flex-col items-center justify-center text-center">
      <div className="mb-6 p-4 rounded-full bg-brand-yellow/10">
        <Crown className="w-12 h-12 text-brand-yellow" />
      </div>
      <h1 className="text-5xl font-bold text-white mb-6">Pro Membership</h1>
      <p className="text-xl text-gray-400 max-w-2xl">
        Unlock full access to all courses, premium content, and community features.
      </p>
      <div className="mt-8 p-4 border border-dashed border-white/20 rounded-lg bg-white/5">
        <span className="text-brand-yellow font-mono">Page content coming soon...</span>
      </div>
    </div>
  );
};