import React, { useState } from 'react';
import { ChevronDown, PlayCircle, FileText, Lock, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface CurriculumModule {
  id: string;
  title: string;
  videoCount: number;
  items: {
    title: string;
    type: 'video' | 'article';
    duration?: string;
    isFree?: boolean;
  }[];
}

interface CourseCurriculumProps {
  modules: CurriculumModule[];
}

const ModuleItem: React.FC<{ module: CurriculumModule; isOpen: boolean; onToggle: () => void; index: number }> = ({ 
  module, 
  isOpen, 
  onToggle,
  index
}) => {
  return (
    <div className="border border-white/10 bg-[#0f0f0f] rounded-xl overflow-hidden mb-4 transition-all duration-300 hover:border-white/20">
      <button 
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none group"
      >
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">
            Module {index + 1}
          </span>
          <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-brand-yellow transition-colors">
            {module.title}
          </h3>
          <span className="text-sm text-gray-500 mt-1">
            {module.videoCount} Videos
          </span>
        </div>
        <div className={`p-2 rounded-full bg-white/5 text-gray-400 group-hover:text-white transition-all duration-300 ${isOpen ? 'rotate-180 bg-white/10' : ''}`}>
          <ChevronDown size={20} />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="border-t border-white/5 bg-[#0a0a0a]">
              {module.items.map((item, i) => (
                <div 
                  key={i}
                  className="flex items-center gap-4 p-4 md:px-6 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 cursor-pointer group/item"
                >
                  <div className="flex-shrink-0">
                     {item.type === 'video' ? (
                       <PlayCircle size={18} className={`text-gray-500 group-hover/item:text-brand-yellow transition-colors ${item.isFree ? 'fill-gray-500/20' : ''}`} />
                     ) : (
                       <FileText size={18} className="text-gray-500 group-hover/item:text-blue-400 transition-colors" />
                     )}
                  </div>
                  <div className="flex-1 text-sm md:text-base text-gray-300 font-medium group-hover/item:text-white transition-colors">
                    {item.title}
                  </div>
                  <div className="flex items-center gap-3">
                    {item.isFree && (
                      <span className="hidden sm:inline-block text-[10px] font-bold bg-brand-green/10 text-green-400 px-2 py-0.5 rounded uppercase border border-green-400/20">
                        Preview
                      </span>
                    )}
                    {item.duration && (
                       <span className="text-xs text-gray-600 font-mono">{item.duration}</span>
                    )}
                    {!item.isFree && <Lock size={14} className="text-gray-600" />}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const CourseCurriculum: React.FC<CourseCurriculumProps> = ({ modules }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div id="curriculum" className="scroll-mt-32">
      <div className="mb-8">
        <div className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-2">
           Table of Contents
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Course Curriculum
        </h2>
        <p className="text-gray-400">
          Total {modules.length} Modules with 120+ Videos & Articles.
        </p>
      </div>

      <div className="space-y-2">
        {modules.slice(0, 5).map((module, index) => (
          <ModuleItem 
            key={module.id} 
            module={module} 
            index={index}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>

      {modules.length > 5 && (
         <button className="w-full py-4 mt-4 rounded-xl bg-[#262626] text-white font-medium hover:bg-[#333] transition-colors flex items-center justify-center gap-2 text-sm">
            <span className="text-lg leading-none">+</span> {modules.length - 5} more sections
         </button>
      )}
    </div>
  );
};