import React from 'react';
import { ChevronRight } from 'lucide-react';
import { GlareHover } from './ui/glare-hover';
import { Link } from 'react-router-dom';

const WavyArrowGraphic = () => (
  <svg viewBox="0 0 320 160" className="w-full h-full" fill="none">
    {/* 
      Path logic matched to screenshot:
      Start Left -> Up to Peak 1 -> Down to Trough -> Up to Peak 2 -> Arrow Right
    */}
    <path 
      d="M 20 100 
         C 50 100, 60 40, 90 40 
         S 130 140, 170 140 
         S 210 40, 250 40
         C 280 40, 280 100, 300 100" 
      stroke="white" 
      strokeWidth="8" 
      strokeLinecap="round"
      fill="none"
      className="drop-shadow-md"
    />
    
    {/* Arrow Head */}
    <path d="M 275 75 L 300 100 L 275 125" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
    
    {/* Pin 1 - Red (First Peak) */}
    <g transform="translate(90, 40)">
       <line x1="0" y1="-5" x2="0" y2="10" stroke="#ef4444" strokeWidth="3" />
       <circle cx="0" cy="-12" r="6" stroke="#ef4444" strokeWidth="2.5" fill="#050505" />
       <circle cx="0" cy="-12" r="2" fill="#ef4444" />
    </g>

    {/* Pin 2 - Yellow (Trough) */}
    <g transform="translate(170, 140)">
       <line x1="0" y1="-15" x2="0" y2="0" stroke="#fbbf24" strokeWidth="3" />
       <circle cx="0" cy="-12" r="6" stroke="#fbbf24" strokeWidth="2.5" fill="#050505" />
       <circle cx="0" cy="-12" r="2" fill="#fbbf24" />
    </g>

    {/* Pin 3 - Blue (Second Peak) */}
    <g transform="translate(250, 40)">
       <line x1="0" y1="-5" x2="0" y2="10" stroke="#3b82f6" strokeWidth="3" />
       <circle cx="0" cy="-12" r="6" stroke="#3b82f6" strokeWidth="2.5" fill="#050505" />
       <circle cx="0" cy="-12" r="2" fill="#3b82f6" />
    </g>
  </svg>
);

export interface BlogCardProps {
  slug: string; // Added slug
  date: string;
  title: string;
  subtitle: string;
  author: string;
  isNew?: boolean;
  className?: string;
}

export const BlogCard: React.FC<BlogCardProps> = ({ slug, date, title, subtitle, author, isNew, className }) => {
  return (
    <div className={`relative group w-full max-w-sm mx-auto perspective-1000 ${className}`}>
      <Link to={`/articles/${slug}`} className="block h-full">
        {/* Main Card Container */}
        <GlareHover 
          className="bg-[#050505] border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col h-full shadow-2xl lg:hover:-translate-y-2 lg:hover:shadow-[0_20px_40px_-15px_rgba(255,212,57,0.1)]"
          borderRadius="1.5rem"
          glareOpacity={0.1}
          glareSize={200}
        >
          
          {/* Folded Corner Effect (Top Right) */}
          <div className="absolute top-0 right-0 z-20 pointer-events-none">
             <div className="w-0 h-0 border-l-[50px] border-l-transparent border-t-[50px] border-t-[#262626] drop-shadow-lg"></div>
          </div>

          {/* Top Section with Graphic */}
          <div className="relative h-48 sm:h-52 w-full flex items-center justify-center p-6 bg-gradient-to-b from-white/[0.03] to-transparent">
            
            {/* "New" Badge */}
            {isNew && (
              <div className="absolute top-6 left-6 z-20">
                <span className="font-cursive text-[#FFD439] text-xl -rotate-12 block font-bold tracking-wider">
                  New
                </span>
              </div>
            )}

            <div className="w-full h-full px-4 pt-4 transform group-hover:scale-105 transition-transform duration-500">
              <WavyArrowGraphic />
            </div>
          </div>

          {/* Content Section */}
          <div className="px-7 pb-8 pt-2 flex flex-col flex-grow">
            <div className="text-gray-500 text-sm font-medium mb-3">{date}</div>
            
            <h3 className="text-2xl font-bold text-white mb-3 leading-tight group-hover:text-brand-yellow transition-colors duration-300">
              {title}
            </h3>
            
            <p className="text-gray-400 text-sm mb-6 leading-relaxed line-clamp-3">
              {subtitle}
            </p>
            
            <div className="text-sm text-gray-400 mb-8 mt-auto">
              Article by <span className="text-white font-bold ml-1">{author}</span>
            </div>

            {/* Dashed Divider */}
            <div className="border-t border-dashed border-white/15 mb-5"></div>

            {/* Action Button */}
            <div className="flex items-center justify-between w-full text-white font-bold text-sm group/btn focus:outline-none">
              <span>Read this Article</span>
              <ChevronRight size={18} className="text-gray-400 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all" />
            </div>
          </div>
        </GlareHover>
      </Link>
    </div>
  );
};