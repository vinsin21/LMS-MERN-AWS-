import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ShimmerButton } from './ui/shimmer-button';
import { BlogCard } from './BlogCard';
import { Link } from 'react-router-dom';

export const Blog: React.FC = () => {
  const articles = [
    {
      slug: "6-ways-to-win-tech-interview",
      date: "Aug 7, 2025",
      title: "6 Ways to Win in Your Next Tech Interview",
      subtitle: "Inspired by 'How to Win Friends & Influence People'",
      author: "Rakesh K",
      isNew: true
    },
    {
      slug: "understanding-microservices",
      date: "Aug 15, 2025",
      title: "Understanding Microservices Architecture",
      subtitle: "A deep dive into breaking down monoliths for scalability.",
      author: "Rakesh K",
      isNew: false
    },
    {
      slug: "react-hooks-beginners",
      date: "Sep 2, 2025",
      title: "Mastering React Hooks for Beginners",
      subtitle: "Simplify your state management with clean and efficient code.",
      author: "Saurabh S",
      isNew: false
    }
  ];

  return (
    <section className="relative py-20 sm:py-32 overflow-hidden">
      
      {/* Background Decorative Circles (Top Right) */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] pointer-events-none opacity-[0.01] translate-x-1/3 -translate-y-1/4 [mask-image:linear-gradient(to_bottom,transparent,black_40%)]">
         <div className="absolute inset-0 bg-white rounded-full blur-[120px]"></div>
         <div className="absolute top-20 right-20 w-3/4 h-3/4 bg-white rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12 sm:mb-20 relative">
          
           {/* Decorative Top Text with Laurels */}
           <div className="flex items-center justify-center gap-3 mb-4">
              {/* Left Laurel */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-600 rotate-[-30deg]">
                <path d="M7 19C7 19 9 14 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M10 22C10 22 12 17 17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M4 16C4 16 6 11 11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              
              <span className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">Home / Articles</span>
              
              {/* Right Laurel */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-600 rotate-[30deg] scale-x-[-1]">
                <path d="M7 19C7 19 9 14 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M10 22C10 22 12 17 17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M4 16C4 16 6 11 11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
           </div>

           <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
             What Developers read
           </h2>
           <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
             Thoughtfully selected pieces that bring you only the most valuable insights.
           </p>

           {/* Handwritten Arrow Decoration */}
           <div className="absolute top-0 right-10 lg:right-1/4 translate-x-12 hidden md:block">
              <span className="font-cursive text-gray-500 text-xl rotate-[-6deg] block mb-2 opacity-80">
                Latest from <br/> the team
              </span>
              <svg width="40" height="40" viewBox="0 0 50 60" fill="none" className="text-gray-600 ml-4 opacity-70">
                 <path d="M10 10 C 15 30, 20 40, 20 50" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="3 3"/>
                 <path d="M20 50 L 15 42 M 20 50 L 26 44" stroke="currentColor" strokeWidth="1" fill="none" />
              </svg>
           </div>
        </div>

        {/* Grid / Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center mb-16">
           {articles.map((article, index) => (
             <BlogCard key={index} {...article} />
           ))}
        </div>

        {/* More Articles Button */}
        <div className="flex justify-center">
          <Link to="/articles">
            <ShimmerButton 
              background="#333333"
              shimmerColor="#ffffff"
              className="text-white border border-white/20"
            >
              More articles 
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </ShimmerButton>
          </Link>
        </div>

      </div>
    </section>
  );
};