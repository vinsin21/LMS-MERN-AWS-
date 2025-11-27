import React from 'react';
import { Star, Calendar, ArrowRight, CheckCircle } from 'lucide-react';
import { ShimmerButton } from '../ui/shimmer-button';

interface CourseHeroProps {
  title: string;
  description: string;
  lastUpdated: string;
  rating: number;
  learnersCount: string;
  price: string;
}

export const CourseHero: React.FC<CourseHeroProps> = ({
  title,
  description,
  lastUpdated,
  rating,
  learnersCount,
  price
}) => {
  return (
    <section className="relative pt-32 pb-12 md:pt-40 md:pb-20 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-brand-yellow/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Left Content */}
          <div className="flex-1 w-full">
            
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-gray-500 uppercase mb-6">
              <span className="bg-brand-yellow text-black px-2 py-0.5 rounded-sm">New</span>
              <span>Home</span>
              <span>/</span>
              <span>Courses</span>
              <span>/</span>
              <span className="text-gray-300 truncate max-w-[150px]">Gen AI</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6 leading-[1.1]">
              {title}
            </h1>

            <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-2xl">
              {description}
            </p>

            {/* Author & Meta */}
            <div className="flex items-center gap-6 mb-8 text-sm">
              <div className="flex items-center gap-3">
                <img 
                  src="https://picsum.photos/id/1062/40/40" 
                  alt="Rakesh K" 
                  className="w-10 h-10 rounded-full border border-white/10" 
                />
                <div>
                  <div className="text-gray-400 text-xs">Course By</div>
                  <div className="font-bold text-white">Rakesh K</div>
                </div>
              </div>
              
              <div className="h-8 w-[1px] bg-white/10"></div>
              
              <div className="flex items-center gap-2 text-gray-300">
                <Calendar size={16} className="text-gray-500" />
                <span>Last updated <span className="text-white font-medium">{lastUpdated}</span></span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
              <ShimmerButton 
                className="w-full sm:w-auto text-black font-bold text-base px-8 py-4 shadow-[0_0_30px_rgba(255,212,57,0.2)]"
                background="#FFD439"
                shimmerColor="#ffffff"
              >
                Enroll now — {price}
              </ShimmerButton>
              
              <button className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/10 text-white font-medium hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
                Course content <ArrowRight size={16} />
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-4">
               <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <img key={i} src={`https://picsum.photos/id/${200+i}/30/30`} className="w-8 h-8 rounded-full border-2 border-[#171717]" alt="Student" />
                  ))}
               </div>
               <div className="flex flex-col">
                 <div className="flex items-center gap-1 text-brand-yellow text-sm font-bold">
                   <span>{rating.toFixed(1)}</span>
                   <span>/ 5</span>
                   <div className="flex gap-0.5 ml-1">
                     {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="currentColor" />)}
                   </div>
                 </div>
                 <span className="text-xs text-gray-500">{learnersCount} Learners already enrolled.</span>
               </div>
            </div>

          </div>

          {/* Right Content - SVG Roadmap */}
          <div className="w-full lg:w-[45%] relative hidden md:block">
            <div className="relative w-full aspect-[4/3] max-w-[500px] mx-auto">
              
              {/* Hand-drawn Arrows & Annotations Container */}
              <svg viewBox="0 0 400 300" className="w-full h-full drop-shadow-2xl filter overflow-visible">
                {/* Define gradients/filters */}
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#444" stopOpacity="1" />
                    <stop offset="100%" stopColor="#22c55e" stopOpacity="1" />
                  </linearGradient>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <marker id="arrowhead" markerWidth="14" markerHeight="10" refX="12" refY="5" orient="auto">
                    <polygon points="0 0, 14 5, 0 10" fill="#ef4444" />
                  </marker>
                </defs>

                {/* The Path */}
                <path 
                  d="M 50 250 C 100 250, 120 180, 180 150 S 280 150, 350 80" 
                  stroke="url(#grad1)" 
                  strokeWidth="6" 
                  fill="none" 
                  strokeLinecap="round"
                />

                {/* Node 1: Beginner */}
                <g transform="translate(50, 250)">
                   <circle r="10" fill="#3f3f46" stroke="#525252" strokeWidth="3" />
                   <text x="0" y="30" textAnchor="middle" fill="#d4d4d8" fontSize="14" fontFamily="sans-serif" fontWeight="bold">Beginner</text>
                   <text x="0" y="45" textAnchor="middle" fill="#71717a" fontSize="12" fontFamily="sans-serif">No AI background</text>
                </g>

                {/* Annotation: You are here */}
                <path d="M 60 190 Q 70 220 58 235" stroke="#ef4444" strokeWidth="2.5" fill="none" markerEnd="url(#arrowhead)" />
                <text x="60" y="180" fill="#ef4444" fontFamily="Caveat" fontSize="20" fontWeight="bold" transform="rotate(-5 60 180)">You are here</text>

                {/* Node 2: Early Career */}
                <g transform="translate(180, 150)">
                   <circle r="10" fill="#22c55e" stroke="#14532d" strokeWidth="3" />
                   <circle r="16" fill="#22c55e" opacity="0.3" className="animate-pulse" />
                   <text x="0" y="30" textAnchor="middle" fill="#d4d4d8" fontSize="14" fontFamily="sans-serif" fontWeight="bold">Early-career</text>
                   <text x="0" y="45" textAnchor="middle" fill="#71717a" fontSize="12" fontFamily="sans-serif">Haven't shipped</text>
                   <text x="0" y="58" textAnchor="middle" fill="#71717a" fontSize="12" fontFamily="sans-serif">AI app yet</text>
                </g>

                {/* Annotation: Duration */}
                <g transform="translate(200, 95) rotate(-15)">
                   <rect x="0" y="0" width="130" height="34" rx="6" fill="#27272a" stroke="#ef4444" strokeWidth="1.5" />
                   <rect x="2" y="2" width="126" height="30" rx="4" fill="#ef4444" fillOpacity="0.1" />
                   <path d="M 6 28 L 124 6" stroke="#ef4444" strokeWidth="1.5" />
                   <text x="65" y="-12" textAnchor="middle" fill="#d4d4d8" fontFamily="Caveat" fontSize="18">≈ 12 weeks of</text>
                   <text x="65" y="8" textAnchor="middle" fill="#d4d4d8" fontFamily="Caveat" fontSize="18">intensive training</text>
                </g>

                {/* Node 3: Gen-AI Builder */}
                <g transform="translate(280, 110)">
                   <circle r="8" fill="#22c55e" stroke="#14532d" strokeWidth="3" />
                   <text x="15" y="25" textAnchor="start" fill="#d4d4d8" fontSize="13" fontFamily="sans-serif" fontWeight="500">Gen-AI Product</text>
                   <text x="15" y="40" textAnchor="start" fill="#d4d4d8" fontSize="13" fontFamily="sans-serif" fontWeight="500">Builder</text>
                </g>

                {/* Node 4: Hiring Ready */}
                <g transform="translate(350, 80)">
                   <circle r="14" fill="#22c55e" stroke="#fff" strokeWidth="3" />
                   <text x="20" y="5" textAnchor="start" fill="#a78bfa" fontSize="20" fontFamily="Caveat" fontWeight="bold" transform="rotate(-10 350 80)">Hiring-ready</text>
                   <text x="20" y="25" textAnchor="start" fill="#ef4444" fontSize="16" fontFamily="Caveat" fontWeight="bold">Gen-AI Developer</text>
                </g>

                {/* Annotation: After this course */}
                <path d="M 335 30 Q 355 50 348 65" stroke="#d4d4d8" strokeWidth="1.5" fill="none" strokeDasharray="4 3" />
                <text x="330" y="20" textAnchor="end" fill="#d4d4d8" fontFamily="Caveat" fontSize="18">After this</text>
                <text x="330" y="38" textAnchor="end" fill="#d4d4d8" fontFamily="Caveat" fontSize="18">course</text>

              </svg>
              
              {/* Bottom Annotation */}
              <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 text-center w-full">
                 <span className="font-cursive text-gray-500 text-2xl">Important details</span>
                 <svg width="40" height="40" viewBox="0 0 50 50" className="mx-auto text-gray-600 opacity-60 mt-1">
                    <path d="M 25 0 Q 30 25 20 45" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    <path d="M 20 45 L 15 35 M 20 45 L 28 38" stroke="currentColor" strokeWidth="1.5" fill="none" />
                 </svg>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};