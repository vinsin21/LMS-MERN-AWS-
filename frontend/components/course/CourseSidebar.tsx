import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

const sections = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'timeline', label: 'Your growth timeline' },
  { id: 'what-you-learn', label: 'What you will learn' },
  { id: 'curriculum', label: 'Course syllabus' },
  { id: 'prerequisites', label: 'Prerequisites' },
  // Testimonials removed from here to be a standalone section
  { id: 'instructor', label: 'Instructor' },
  { id: 'faq', label: 'FAQ' },
];

export const CourseSidebar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('introduction');

  useEffect(() => {
    const handleScroll = () => {
      // Offset represents the distance from the top of the viewport
      // where we consider a section to be "active".
      // 150px gives a nice buffer below the navbar.
      const offset = 150; 
      
      let current = sections[0].id;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          
          // If the top of the section is above or near the threshold, it's a candidate.
          // Since we iterate top-down, the last one that meets this condition
          // is the one currently occupying the top part of the screen.
          if (rect.top <= offset) {
            current = section.id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check in case user lands on page with hash or refresh
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // This relies on the `scroll-mt-32` class on the target elements
      // to handle the navbar offset automatically.
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    // Sticky positioning requires no overflow-hidden on ancestors
    // top-28 allows clearance for the fixed navbar (h-20 + spacing)
    <div className="sticky top-28 pl-4 max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar">
      <h3 className="text-lg font-bold text-white mb-6">On this page</h3>
      
      <nav className="flex flex-col border-l border-white/10 relative">
        {/* Animated active indicator line */}
        <div 
           className="absolute left-[-1.5px] w-[3px] bg-brand-yellow rounded-full transition-all duration-300 ease-out shadow-[0_0_10px_rgba(255,212,57,0.5)]"
           style={{
              top: `${sections.findIndex(s => s.id === activeSection) * 44}px`, 
              height: '40px', // Slightly shorter than the 44px button to look centered
              marginTop: '2px'
           }}
        />

        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`
              text-left px-5 h-[44px] text-sm transition-all duration-200 flex items-center
              ${activeSection === section.id 
                ? 'text-white font-bold translate-x-1' 
                : 'text-gray-500 font-medium hover:text-gray-300 hover:translate-x-1'}
            `}
          >
            {section.label}
          </button>
        ))}
      </nav>

      <div className="mt-10 mb-6">
         <button className="w-full group flex items-center justify-center gap-2 bg-[#262626] border border-white/10 hover:bg-[#333] hover:border-white/20 text-white py-3.5 rounded-xl text-sm font-bold transition-all shadow-lg active:scale-95">
            Enroll Now <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
         </button>
      </div>
    </div>
  );
};