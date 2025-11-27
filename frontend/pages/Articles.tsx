import React from 'react';
import { BlogCard } from '../components/BlogCard';
import { Search } from 'lucide-react';

const articles = [
    {
      slug: "6-ways-to-win-tech-interview",
      date: "Aug 7, 2025",
      title: "6 Ways to Win in Your Next Tech Interview",
      subtitle: "Inspired by 'How to Win Friends & Influence People' and adapted for the modern tech hiring landscape.",
      author: "Rakesh K",
      isNew: true
    },
    {
      slug: "understanding-microservices",
      date: "Aug 15, 2025",
      title: "Understanding Microservices Architecture",
      subtitle: "A deep dive into breaking down monoliths for scalability, fault isolation, and independent deployments.",
      author: "Rakesh K",
      isNew: false
    },
    {
      slug: "react-hooks-beginners",
      date: "Sep 2, 2025",
      title: "Mastering React Hooks for Beginners",
      subtitle: "Simplify your state management with clean and efficient code using built-in React hooks.",
      author: "Saurabh S",
      isNew: false
    },
    {
      slug: "future-of-devops",
      date: "Sep 10, 2025",
      title: "The Future of DevOps: AI Integration",
      subtitle: "How Artificial Intelligence is automating CI/CD pipelines and infrastructure management.",
      author: "Rakesh K",
      isNew: true
    },
    {
      slug: "docker-vs-k8s",
      date: "Sep 18, 2025",
      title: "Docker vs Kubernetes: What's the Difference?",
      subtitle: "A comprehensive comparison for beginners looking to start their journey in container orchestration.",
      author: "John D",
      isNew: false
    },
    {
      slug: "optimizing-aws-costs",
      date: "Oct 5, 2025",
      title: "Optimizing AWS Costs for Startups",
      subtitle: "Practical strategies to manage your cloud bill effectively without compromising on performance.",
      author: "Rakesh K",
      isNew: false
    },
    {
      slug: "golang-backend",
      date: "Oct 12, 2025",
      title: "Why Go is Taking Over Backend Development",
      subtitle: "Exploring the simplicity, concurrency model, and performance benefits of Golang.",
      author: "Sarah M",
      isNew: false
    },
     {
      slug: "building-scalable-systems",
      date: "Oct 20, 2025",
      title: "Building Scalable Systems",
      subtitle: "Key principles every senior engineer should know when designing for high availability.",
      author: "Rakesh K",
      isNew: false
    },
     {
      slug: "frontend-performance",
      date: "Nov 1, 2025",
      title: "Frontend Performance Patterns",
      subtitle: "Techniques to reduce bundle size and improve Core Web Vitals for better user experience.",
      author: "Saurabh S",
      isNew: true
    }
  ];

export const Articles: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 relative bg-[#171717]">
      
       {/* Background Ambience */}
       <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-[#FFD439]/5 via-[#171717] to-[#171717] pointer-events-none"></div>

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Hero Section */}
        <div className="text-center mb-24 relative">
          
          {/* Decorative Elements similar to Courses page */}
          <div className="hidden lg:block absolute top-1/2 left-[5%] xl:left-[10%] -translate-y-1/2">
             <div className="relative">
                <span className="font-cursive text-gray-500 text-2xl absolute -top-8 -left-4 -rotate-12 whitespace-nowrap">Read & Learn</span>
                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" className="text-gray-600/60 rotate-[20deg]">
                   <path d="M10 40 C 20 30, 30 15, 40 5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                   <path d="M40 5 L 35 12 M 40 5 L 30 5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
             </div>
          </div>

          <div className="hidden lg:block absolute top-0 right-[5%] xl:right-[12%] translate-y-8">
             <div className="relative">
                <span className="font-cursive text-gray-500 text-2xl absolute -top-6 left-4 rotate-6 whitespace-nowrap">Stay Updated</span>
                <svg width="40" height="50" viewBox="0 0 50 60" fill="none" className="text-gray-600/60 rotate-[-15deg]">
                   <path d="M10 10 C 10 30, 30 40, 30 55" stroke="currentColor" strokeWidth="1.5" fill="none" />
                   <path d="M30 55 L 24 48 M 30 55 L 38 48" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
             </div>
          </div>

          {/* Breadcrumbs */}
          <div className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-6">
            HOME / ARTICLES
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6 leading-[1.1]">
            Writing on Software Architecture,<br />
            DevOps, and Career Growth.
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl font-normal max-w-3xl mx-auto leading-relaxed mb-10">
            All of my long-form thoughts on programming, leadership, software architecture, and more, collected in chronological order.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative group">
             <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-500 group-focus-within:text-brand-yellow transition-colors" />
             </div>
             <input 
               type="text" 
               placeholder="Search articles..." 
               className="block w-full pl-11 pr-4 py-4 bg-[#0a0a0a] border border-white/10 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-brand-yellow/50 focus:ring-1 focus:ring-brand-yellow/50 transition-all shadow-lg"
             />
          </div>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12">
           {articles.map((article, index) => (
             <BlogCard key={index} {...article} className="w-full" />
           ))}
        </div>

        {/* Pagination / Load More */}
        <div className="mt-20 flex justify-center">
             <button className="px-8 py-3 rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all bg-[#0a0a0a] font-medium text-sm">
                Load more articles
             </button>
        </div>

       </div>
    </div>
  );
};