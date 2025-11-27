import React from 'react';
import { Star, Crown, ArrowRight } from 'lucide-react';
import { ShimmerButton } from './ui/shimmer-button';
import { useNavigate } from 'react-router-dom';

export const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex flex-col items-center text-center">
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-glow pointer-events-none opacity-40"></div>
      
      {/* Faint Code Background - Decorative (DevOps Themed) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none opacity-[0.03] text-sm font-mono text-white whitespace-pre text-left">
        <div className="absolute top-20 left-10 transform -rotate-12">
          {`resource "aws_instance" "web" {\n  ami           = "ami-0c55b159cbfafe1f0"\n  instance_type = "t3.micro"\n  tags = {\n    Name = "Production"\n  }\n}`}
        </div>
        <div className="absolute top-40 right-10 transform rotate-6">
          {`FROM node:18-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nCMD ["npm", "start"]`}
        </div>
        <div className="absolute bottom-40 left-1/4 transform -rotate-3">
          {`kubectl scale deployment\n--replicas=5\n-n production`}
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 w-full flex flex-col items-center">
        
        {/* Social Proof */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 sm:mb-12 animate-fade-in-up">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <img 
                key={i}
                src={`https://picsum.photos/id/${100 + i}/40/40`} 
                alt="Student" 
                className="w-10 h-10 rounded-full border-2 border-[#171717] object-cover ring-1 ring-white/10"
              />
            ))}
          </div>
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-1">
              <span className="text-white font-bold">4.9 / 5</span>
              <div className="flex text-brand-yellow">
                <Star size={14} fill="#FFD439" strokeWidth={0} />
                <Star size={14} fill="#FFD439" strokeWidth={0} />
                <Star size={14} fill="#FFD439" strokeWidth={0} />
                <Star size={14} fill="#FFD439" strokeWidth={0} />
                <Star size={14} fill="#FFD439" strokeWidth={0} />
              </div>
            </div>
            <span className="text-gray-400 text-xs">Over 126K+ students on YT</span>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.1] font-bold tracking-tight mb-8">
          <span className="block text-white">We make sure you become</span>
          <span className="relative block mt-2">
             <span className="text-brand-yellow">AWS DevOps Engineer.</span>
             
             {/* Green Guaranteed Badge */}
             <div className="absolute -top-6 -right-4 md:right-0 transform rotate-12">
               <div className="relative bg-[#22c55e] text-white px-4 py-1 rounded-sm shadow-lg transform -rotate-3">
                 <span className="font-cursive text-2xl font-bold tracking-wide">Guaranteed!</span>
                 {/* Little triangle for the tag effect */}
                 <div className="absolute bottom-[-6px] left-4 w-0 h-0 border-l-[6px] border-l-transparent border-t-[6px] border-t-[#22c55e] border-r-[6px] border-r-transparent"></div>
               </div>
             </div>
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Learn with simple lessons, real projects, and tools that prepare for real-world production.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto relative">
          
          {/* Cursive Arrow & Text */}
          <div className="hidden lg:block absolute -left-48 top-1/2 transform -translate-y-1/2 text-center opacity-60">
             <span className="font-cursive text-gray-400 text-2xl rotate-[-15deg] block mb-2">100% Risk-free</span>
             <svg width="60" height="40" viewBox="0 0 100 60" fill="none" className="text-gray-500 mx-auto rotate-[-10deg]">
               <path d="M10 50 C 30 40, 60 40, 90 10" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="4 2" />
               <path d="M90 10 L 80 15 M 90 10 L 85 25" stroke="currentColor" strokeWidth="2" fill="none" />
             </svg>
          </div>

          <ShimmerButton 
            background="#FFD439" 
            shimmerColor="#ffffff" 
            className="text-black shadow-[0_0_20px_rgba(255,212,57,0.3)] font-semibold"
            onClick={() => navigate('/membership')}
          >
            <Crown size={20} className="mr-2" />
            Become Pro Member
          </ShimmerButton>
          
          <ShimmerButton 
            background="#333333" 
            shimmerColor="#ffffff"
            className="text-white border border-white/20"
            onClick={() => navigate('/courses')}
          >
            Check Courses
            <ArrowRight size={20} className="ml-2" />
          </ShimmerButton>
        </div>

        {/* Bottom Decorative Lines / Gradient */}
        <div className="absolute bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        
        {/* Mockup Top (Hinting at content below) */}
        <div className="mt-20 w-full max-w-4xl mx-auto relative opacity-50 mask-image-b-0">
             <div className="w-full h-32 rounded-t-3xl border-t border-l border-r border-white/10 bg-[#1e1e1e] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-brand-yellow/50 via-brand-yellow to-brand-yellow/50"></div>
                {/* Fake UI dots */}
                <div className="flex gap-2 p-4">
                  <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                </div>
                {/* Minimal terminal mockup hint */}
                <div className="px-6 pt-2 font-mono text-xs text-gray-500">
                  <p><span className="text-brand-yellow">➜</span> <span className="text-blue-400">~</span> aws configure</p>
                  <p className="mt-1">AWS Access Key ID [None]: ****************</p>
                </div>
             </div>
             {/* Fade out bottom of the mockup hint */}
             <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#171717]"></div>
        </div>

      </div>
    </section>
  );
};