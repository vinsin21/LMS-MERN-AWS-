import React from 'react';
import { EmptyState } from './ui/interactive-empty-state';
import { 
  Rocket, 
  Code2, 
  Terminal, 
  Database, 
  Lock, 
  Hammer,
  GraduationCap,
  Calendar,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export const Roadmap: React.FC = () => {
  const handleNotify = () => {
    alert("You'll be notified when this launches!");
  };

  return (
    <section className="relative py-20 overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute inset-0 bg-glow pointer-events-none opacity-20 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 relative">
           
           {/* Decorative Top Text with Laurels */}
           <div className="flex items-center justify-center gap-3 mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-600 rotate-[-30deg]">
                <path d="M7 19C7 19 9 14 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M10 22C10 22 12 17 17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M4 16C4 16 6 11 11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              
              <span className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">Roadmap</span>
              
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-600 rotate-[30deg] scale-x-[-1]">
                <path d="M7 19C7 19 9 14 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M10 22C10 22 12 17 17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M4 16C4 16 6 11 11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
           </div>

           <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
             Upcoming Learning Paths
           </h2>
           <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
             We are constantly building new modules to help you master the modern tech stack.
           </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1: System Design */}
          <EmptyState
            theme="dark"
            title="System Design Masterclass"
            description="Learn to architect scalable systems like a senior engineer. Coming Winter 2025."
            icons={[
              <Database key="1" className="w-6 h-6" />,
              <Rocket key="2" className="w-6 h-6" />,
              <Terminal key="3" className="w-6 h-6" />
            ]}
            action={{
              label: "Notify Me",
              icon: <Sparkles className="w-4 h-4" />,
              onClick: handleNotify
            }}
          />

          {/* Card 2: Rust Foundation */}
          <EmptyState
            theme="dark"
            // variant="subtle" - Removed to ensure uniform look matching testimonials
            title="Rust for DevOps"
            description="A hands-on guide to building high-performance CLI tools and services in Rust."
            icons={[
              <Code2 key="1" className="w-6 h-6" />,
              <Hammer key="2" className="w-6 h-6" />,
              <Lock key="3" className="w-6 h-6" />
            ]}
            action={{
              label: "Join Waitlist",
              icon: <ChevronRight className="w-4 h-4" />,
              onClick: handleNotify
            }}
          />

          {/* Card 3: Hackathon */}
          <EmptyState
            theme="dark"
            title="Community Hackathon"
            description="Prepare your teams. The biggest open-source challenge is arriving soon."
            icons={[
              <GraduationCap key="1" className="w-6 h-6" />,
              <Calendar key="2" className="w-6 h-6" />,
              <Sparkles key="3" className="w-6 h-6" />
            ]}
            action={{
              label: "See Details",
              icon: <Calendar className="w-4 h-4" />,
              onClick: handleNotify
            }}
          />
          
        </div>
      </div>
    </section>
  );
};