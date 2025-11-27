import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CourseHero } from '../components/course/CourseHero';
import { CourseCurriculum, CurriculumModule } from '../components/course/CourseCurriculum';
import { CourseSidebar } from '../components/course/CourseSidebar';
import { Testimonials } from '../components/Testimonials';
import { BarChart, Clock, Globe, Zap, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Linkedin, Twitter, Youtube } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Detailed Mock Data
const courseData = {
  title: 'Master Generative AI using JavaScript in 12 Weeks',
  description: 'Complete course for building, deploying, and optimizing Generative AI applications using Modern Frameworks and best practices.',
  lastUpdated: 'October 2025',
  rating: 5.0,
  learnersCount: '130+',
  price: '₹14,990',
  
  // Key Stats for bottom of hero
  stats: [
    { label: 'Category', value: 'Gen AI', icon: BarChart },
    { label: 'Duration', value: '30hr+', icon: Clock },
    { label: 'Level', value: 'Basic to Advanced', icon: Zap },
    { label: 'Format', value: 'Recorded', icon: Globe },
    { label: 'Language', value: 'Hinglish', icon: Globe },
  ],

  whatYouWillLearn: [
    "Build your own ChatGPT clone using OpenAI API",
    "Master Prompt Engineering techniques (Zero-shot, Few-shot, Chain of Thought)",
    "Understand Vector Databases & Embeddings from scratch",
    "Build RAG (Retrieval Augmented Generation) pipelines",
    "Deploy GenAI applications to production using AWS",
    "Fine-tune LLMs for specific use cases",
    "Work with LangChain framework efficiently",
    "Integrate voice and image generation models"
  ],

  prerequisites: [
    "Basic understanding of JavaScript / TypeScript",
    "Familiarity with React.js is helpful but not mandatory for backend logic",
    "No prior AI/ML knowledge required"
  ],

  faqs: [
    { q: "Is this course suitable for beginners?", a: "Yes! We start from the absolute basics of what Generative AI is and gradually move to advanced concepts." },
    { q: "Do I need a paid OpenAI account?", a: "You will need an OpenAI API key. A free tier might work for some parts, but a small credit balance ($5) is recommended for smooth testing." },
    { q: "Will I get the source code?", a: "Absolutely. All project source code is provided via GitHub repositories." },
    { q: "Is there a refund policy?", a: "Yes, we offer a 7-day money-back guarantee if you are not satisfied with the content." }
  ],

  modules: [
    {
      id: 'm1',
      title: 'Foundation of generative AI & LLM',
      videoCount: 4,
      items: [
        { title: 'What is Generative AI?', type: 'video', duration: '10:05', isFree: true },
        { title: 'Introduction to LLMs', type: 'video', duration: '15:20', isFree: true },
        { title: 'AI Models and their capabilities', type: 'video', duration: '12:45' },
        { title: 'Tokens, Context, Context Window, Inference', type: 'video', duration: '18:30' },
      ]
    },
    {
      id: 'm2',
      title: 'Prompt engineering',
      videoCount: 5,
      items: [
        { title: 'Art of Prompting', type: 'video', duration: '14:10' },
        { title: 'Zero-shot, One-shot, Few-shot prompting', type: 'video', duration: '22:15' },
        { title: 'Chain of Thought Prompting', type: 'video', duration: '16:40' },
        { title: 'System Prompts vs User Prompts', type: 'video', duration: '08:50' },
        { title: 'Prompt Engineering Guide', type: 'article', duration: '10 min read' },
      ]
    },
    {
      id: 'm3',
      title: 'Working with LLMs',
      videoCount: 8,
      items: [
        { title: 'OpenAI API Fundamentals', type: 'video', duration: '20:00' },
        { title: 'Temperature, Top_p, Frequency Penalty', type: 'video', duration: '15:00' },
        { title: 'Streaming Responses', type: 'video', duration: '25:10' },
      ]
    },
    {
      id: 'p1',
      title: 'Project 1: Build your own chatbot (ChatGPT Clone)',
      videoCount: 6,
      items: []
    },
    {
      id: 'm4',
      title: 'Vector Databases & Embeddings',
      videoCount: 5,
      items: []
    },
    {
      id: 'm5',
      title: 'RAG (Retrieval Augmented Generation)',
      videoCount: 7,
      items: []
    }
  ] as CurriculumModule[]
};

const SectionHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 relative inline-block">
    {children}
    <div className="absolute -bottom-2 left-0 w-1/2 h-1 bg-brand-yellow rounded-full"></div>
  </h2>
);

const FaqItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex items-center justify-between text-left focus:outline-none group"
      >
        <span className="font-medium text-gray-200 group-hover:text-brand-yellow transition-colors">{question}</span>
        <div className={`text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown size={20} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-gray-400 text-sm leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const CourseDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div className="min-h-screen bg-[#171717]">
      
      {/* 1. Hero Section */}
      <CourseHero 
        title={courseData.title}
        description={courseData.description}
        lastUpdated={courseData.lastUpdated}
        rating={courseData.rating}
        learnersCount={courseData.learnersCount}
        price={courseData.price}
      />

      {/* Stats Bar */}
      <div className="hidden md:block bg-[#171717] border-y border-white/5 py-12 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          {/* Annotation for "Important details" pointing to center item (index 2) */}
           <div className="hidden md:flex flex-col items-center absolute left-1/2 -translate-x-1/2 -top-14 z-30 pointer-events-none">
              <span className="font-cursive text-gray-500 text-xl mb-1 -rotate-2">Important details</span>
              <svg width="25" height="40" viewBox="0 0 30 50" fill="none" className="text-gray-600 opacity-80 ml-4">
                <path d="M 20 0 Q 20 20 10 45" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                <path d="M 10 45 L 6 38 M 10 45 L 16 40" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              </svg>
           </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-0">
            {courseData.stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center text-center relative group">
                {index !== courseData.stats.length - 1 && (
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-12 bg-white/5 translate-x-[50%]"></div>
                )}
                
                {/* Diamond Icon */}
                <div className="mb-5 relative w-12 h-12 flex items-center justify-center">
                   <div className="absolute inset-0 bg-[#171717] border border-white/10 rounded-[12px] rotate-45 group-hover:border-brand-yellow/50 group-hover:bg-brand-yellow/5 transition-all duration-300 shadow-lg"></div>
                   <stat.icon size={18} className="relative z-10 text-gray-400 group-hover:text-brand-yellow transition-colors" />
                </div>

                <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">{stat.label}</span>
                <span className="text-white font-medium text-base">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Content Area with Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
           
           {/* Sidebar (Desktop) - Sticky */}
           <div className="hidden lg:block lg:col-span-3">
              <CourseSidebar />
           </div>

           {/* Main Content */}
           <div className="lg:col-span-9 space-y-20 md:space-y-24">
              
              {/* Introduction */}
              <div id="introduction" className="scroll-mt-32">
                 <SectionHeading>Introduction</SectionHeading>
                 <div className="prose prose-invert max-w-none text-gray-400">
                    <p className="mb-4">
                      Generative AI is transforming the software industry. From intelligent chatbots to autonomous agents, the ability to integrate LLMs into applications is becoming a <strong>must-have skill</strong> for modern developers.
                    </p>
                    <p>
                      In this comprehensive 12-week program, we don't just teach you the API syntax; we teach you how to think like an AI engineer. You will learn to build robust, production-ready applications that leverage the power of models like GPT-4, Claude, and open-source alternatives.
                    </p>
                 </div>
              </div>
              
              {/* Timeline (Text representation as visual is in Hero) */}
              <div id="timeline" className="scroll-mt-32">
                 <SectionHeading>Your growth timeline</SectionHeading>
                 <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-32 bg-brand-yellow/5 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="relative z-10 space-y-8">
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white">01</div>
                          <div className="flex-1 w-0.5 bg-white/10 my-2"></div>
                        </div>
                        <div>
                           <h3 className="text-white font-bold text-lg">Foundation (Weeks 1-4)</h3>
                           <p className="text-gray-400 text-sm mt-1">Mastering tokens, embeddings, and prompt engineering.</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-brand-yellow/20 flex items-center justify-center text-xs font-bold text-brand-yellow">02</div>
                          <div className="flex-1 w-0.5 bg-white/10 my-2"></div>
                        </div>
                        <div>
                           <h3 className="text-white font-bold text-lg">Building (Weeks 5-8)</h3>
                           <p className="text-gray-400 text-sm mt-1">Development of Chatbots, RAG pipelines, and Vector search integration.</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-xs font-bold text-green-500">03</div>
                        </div>
                        <div>
                           <h3 className="text-white font-bold text-lg">Production (Weeks 9-12)</h3>
                           <p className="text-gray-400 text-sm mt-1">Deployment, fine-tuning, evaluation, and optimizing for cost/latency.</p>
                        </div>
                      </div>
                    </div>
                 </div>
              </div>

              {/* What you will learn */}
              <div id="what-you-learn" className="scroll-mt-32">
                  <SectionHeading>What you will learn</SectionHeading>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {courseData.whatYouWillLearn.map((item, idx) => (
                       <div key={idx} className="flex gap-3 p-4 rounded-lg bg-[#0a0a0a] border border-white/5 hover:border-brand-yellow/30 transition-colors">
                          <CheckCircle2 className="text-brand-yellow shrink-0 mt-0.5" size={20} />
                          <span className="text-gray-300 text-sm font-medium leading-relaxed">{item}</span>
                       </div>
                     ))}
                  </div>
              </div>

              {/* Curriculum */}
              <CourseCurriculum modules={courseData.modules} />

              {/* Prerequisites */}
              <div id="prerequisites" className="scroll-mt-32">
                 <SectionHeading>Prerequisites</SectionHeading>
                 <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6">
                    <ul className="space-y-4">
                      {courseData.prerequisites.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                           <AlertCircle size={20} className="text-blue-400 shrink-0 mt-0.5" />
                           <span className="text-gray-400 text-sm">{req}</span>
                        </li>
                      ))}
                    </ul>
                 </div>
              </div>

              {/* Instructor */}
              <div id="instructor" className="scroll-mt-32">
                <SectionHeading>Instructor</SectionHeading>
                <div className="flex flex-col md:flex-row gap-8 items-start bg-[#0a0a0a] border border-white/5 p-8 rounded-2xl">
                   <div className="relative shrink-0">
                      <img src="https://picsum.photos/id/1062/200/200" alt="Rakesh K" className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-[#171717]" />
                      <div className="absolute bottom-2 right-2 w-8 h-8 bg-brand-yellow rounded-full flex items-center justify-center text-black">
                        <CheckCircle2 size={16} />
                      </div>
                   </div>
                   <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-1">Rakesh K</h3>
                      <p className="text-brand-yellow font-medium mb-4 text-sm">Senior Fullstack Engineer & Educator</p>
                      <p className="text-gray-400 text-sm leading-relaxed mb-6">
                        Ex-SDE at Top Product Companies. Passionate about simplifying complex tech concepts. I have taught over 100,000 students through my YouTube channel "Coder's Gyan" and premium cohorts. My mission is to make high-quality tech education accessible and practice-oriented.
                      </p>
                      <div className="flex gap-4">
                        <a href="#" className="text-gray-500 hover:text-white transition-colors"><Twitter size={20} /></a>
                        <a href="#" className="text-gray-500 hover:text-white transition-colors"><Linkedin size={20} /></a>
                        <a href="#" className="text-gray-500 hover:text-white transition-colors"><Youtube size={20} /></a>
                      </div>
                   </div>
                </div>
              </div>
              
              {/* FAQ */}
              <div id="faq" className="scroll-mt-32 pb-20">
                <SectionHeading>Frequently Asked Questions</SectionHeading>
                <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 md:p-8">
                   {courseData.faqs.map((faq, idx) => (
                      <FaqItem key={idx} question={faq.q} answer={faq.a} />
                   ))}
                </div>
              </div>

           </div>
        </div>
      </div>
      
      {/* 3. Testimonials Section - Standalone at the bottom */}
      <div className="border-t border-white/5">
        <Testimonials />
      </div>

    </div>
  );
};