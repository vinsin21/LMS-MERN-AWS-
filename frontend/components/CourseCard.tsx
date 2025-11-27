import React from 'react';
import { Star, ArrowRight, UserPlus, Clock } from 'lucide-react';
import { Course } from '../types';
import { useNavigate } from 'react-router-dom';
import { GlareHover } from './ui/glare-hover';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const navigate = useNavigate();

  // Helper to render the specific "Logo" area based on the visualStyle
  const renderVisual = () => {
    switch (course.visualStyle) {
      case 'genai':
        return (
          <div className="flex items-center justify-center h-full">
            <h3 className="text-4xl font-bold text-white flex items-center gap-2">
              Gen AI 
              <span className="bg-[#f7df1e] text-black text-xl px-1.5 py-0.5 rounded font-bold self-start mt-1">JS</span>
            </h3>
          </div>
        );
      case 'mern':
        return (
          <div className="flex items-center justify-center h-full">
            <h3 className="text-4xl font-black text-white tracking-[0.3em]">M E R N +</h3>
          </div>
        );
      case 'backend':
        return (
          <div className="flex flex-col items-center justify-center h-full leading-none">
            <h3 className="text-3xl font-black text-[#FFD439] tracking-widest uppercase mb-1">Backend</h3>
            <span className="font-cursive text-white text-2xl transform -rotate-6">Foundation</span>
          </div>
        );
      case 'go':
        return (
          <div className="flex items-center justify-center h-full relative">
            {/* Speed lines effect */}
            <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-12 h-0.5 bg-blue-500/50 blur-[1px]"></div>
            <div className="absolute left-1/4 top-1/2 -translate-y-1/2 mt-2 w-8 h-0.5 bg-blue-500/30 blur-[1px]"></div>
            <h3 className="text-6xl font-black italic text-[#00ADD8] pr-4">GO</h3>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <GlareHover 
      onClick={() => navigate(`/courses/${course.slug}`)}
      className="group bg-[#0a0a0a] border-white/5 rounded-3xl hover:border-white/10 transition-all duration-300 hover:-translate-y-1 flex flex-col h-full shadow-lg"
      glareOpacity={0.1}
      glareSize={200}
      borderRadius="1.5rem"
    >
      {/* Top Visual Section */}
      <div className="h-56 bg-gradient-to-b from-white/[0.02] to-transparent relative p-6 border-b border-white/5">
        
        {/* Badge */}
        {course.badge && (
          <div className="absolute top-6 left-6 z-10">
            <span 
              className="font-cursive text-xl font-bold"
              style={{ color: course.badge.color }}
            >
              {course.badge.text}
            </span>
          </div>
        )}

        {/* Visual Content */}
        {renderVisual()}
      </div>

      {/* Info Content */}
      <div className="p-6 flex flex-col flex-grow">
        
        {/* Meta Row */}
        <div className="flex items-center justify-between text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-4">
          <span>{course.category}</span>
          <div className="flex items-center gap-1">
             <Clock size={12} />
             <span>{course.duration}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 leading-snug group-hover:text-brand-yellow transition-colors">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2">
          {course.description}
        </p>

        {/* Author & Rating Row */}
        <div className="mt-auto mb-6">
           <div className="text-xs text-gray-500 mb-2">
             Course By <span className="text-gray-300 font-medium">{course.author}</span>
           </div>
           
           {course.rating && (
             <div className="flex items-center gap-2 text-sm">
               <span className="font-bold text-white">{course.rating.toFixed(1)}</span>
               <div className="flex">
                 {[1,2,3,4,5].map(i => (
                   <Star key={i} size={12} className="fill-[#FFD439] text-[#FFD439]" />
                 ))}
               </div>
               <span className="text-gray-500 text-xs">({course.studentsCount})</span>
             </div>
           )}
           {!course.rating && (
             <div className="flex items-center gap-2 text-xs text-gray-500">
               <UserPlus size={14} />
               <span>Joined {course.studentsCount}</span>
             </div>
           )}
        </div>

        {/* Footer / Action */}
        <div className="pt-5 border-t border-dashed border-white/10 flex items-center justify-between">
          
          {course.status === 'open' ? (
            <>
              <button className="flex items-center gap-2 text-white text-sm font-bold group/btn">
                Enroll Now
                <ArrowRight size={16} className="text-gray-500 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all" />
              </button>
              <span className="text-white font-bold">{course.price}</span>
            </>
          ) : (
            <>
              <button className="flex items-center gap-2 text-gray-300 text-sm font-bold group/btn hover:text-white">
                <UserPlus size={16} />
                Join Waitlist
                <ArrowRight size={16} className="text-gray-500 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all" />
              </button>
              {course.price ? (
                 <span className="text-white font-bold">{course.price}</span>
              ) : (
                <span className="text-xs font-mono text-gray-500 bg-white/5 px-2 py-1 rounded">COMING SOON</span>
              )}
            </>
          )}

        </div>

      </div>
    </GlareHover>
  );
};
