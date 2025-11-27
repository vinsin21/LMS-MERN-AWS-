import React from 'react';
import { CourseCard } from '../components/CourseCard';
import { Course } from '../types';

const coursesData: Course[] = [
  {
    id: '1',
    title: 'Master Generative AI using JavaScript in 12 Weeks',
    description: 'Complete course for building, deploying, and optimizing Generative AI applications using modern JavaScript tools.',
    price: '₹14,990',
    badge: { text: 'New', color: '#FFD439' },
    category: 'GEN AI',
    duration: '30hr+',
    rating: 5.0,
    studentsCount: '130+ Joined',
    author: 'Rakesh K',
    slug: 'gen-ai-js',
    visualStyle: 'genai',
    status: 'open'
  },
  {
    id: '2',
    title: 'Become a Production-ready Fullstack Engineer in 14 weeks',
    description: 'Ship a real-time pizza-ordering SAAS, master Devops & microservices, and get job-ready.',
    price: '₹16,990',
    badge: { text: 'Bestseller', color: '#FFD439' },
    category: 'FULLSTACK',
    duration: '80hr+',
    rating: 4.9,
    studentsCount: '700+ Joined',
    author: 'Rakesh K',
    slug: 'mern-plus',
    visualStyle: 'mern',
    status: 'open'
  },
  {
    id: '3',
    title: 'Master Backend Foundation through hands-on Training',
    description: 'Join an intensive recorded backend course to build real-world production-ready APIs.',
    price: '₹7,495',
    // No badge for this one in screenshot, or maybe implied. Keeping clean.
    category: 'BACKEND',
    duration: '46hr+',
    rating: 4.9,
    studentsCount: '280+ Joined',
    author: 'Rakesh K',
    slug: 'backend-foundation',
    visualStyle: 'backend',
    status: 'open'
  },
  {
    id: '4',
    title: 'Learn Golang by building Real-world projects',
    description: 'Learn Golang from the ground up & in great depth by building multiple CLI tools and services.',
    badge: { text: 'Upcoming', color: '#60a5fa' }, // Blueish for upcoming
    category: 'BACKEND',
    duration: 'Coming Soon',
    studentsCount: '350+',
    author: 'Rakesh K',
    slug: 'golang',
    visualStyle: 'go',
    status: 'waitlist'
  }
];

export const Courses: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 relative">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-[#FFD439]/5 via-[#171717] to-[#171717] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header / Hero Section */}
        <div className="text-center mb-20 relative">
          
          {/* Decorative Left Element */}
          <div className="hidden lg:block absolute top-1/2 left-[5%] xl:left-[10%] -translate-y-1/2">
             <div className="relative">
                <span className="font-cursive text-gray-500 text-2xl absolute -top-8 -left-4 -rotate-12 whitespace-nowrap">Beginner to Pro</span>
                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" className="text-gray-600/60 rotate-[20deg]">
                   <path d="M10 40 C 20 30, 30 15, 40 5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                   <path d="M40 5 L 35 12 M 40 5 L 30 5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
             </div>
          </div>

          {/* Decorative Right Element */}
          <div className="hidden lg:block absolute top-0 right-[5%] xl:right-[12%] translate-y-8">
             <div className="relative">
                <span className="font-cursive text-gray-500 text-2xl absolute -top-6 left-4 rotate-6 whitespace-nowrap">Career Focused</span>
                <svg width="40" height="50" viewBox="0 0 50 60" fill="none" className="text-gray-600/60 rotate-[-15deg]">
                   <path d="M10 10 C 10 30, 30 40, 30 55" stroke="currentColor" strokeWidth="1.5" fill="none" />
                   <path d="M30 55 L 24 48 M 30 55 L 38 48" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
             </div>
          </div>

          <div className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-6">
            HOME / COURSES
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
            Master Software Development<br />
            with our structured courses
          </h1>
          
          <p className="text-gray-500 text-lg md:text-xl font-normal">
            designed to make you job-ready.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coursesData.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

      </div>
    </div>
  );
};