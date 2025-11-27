import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ChevronRight, Share2, Linkedin, Twitter, Link as LinkIcon } from 'lucide-react';
import { ShimmerButton } from '../components/ui/shimmer-button';
import { CompactBlogCard } from '../components/CompactBlogCard';
import { motion, useScroll, useSpring } from 'framer-motion';

// Mock Data for Articles
const articleDatabase: Record<string, any> = {
   "6-ways-to-win-tech-interview": {
      title: "6 Ways to Win in Your Next Tech Interview",
      subtitle: "Inspired by 'How to Win Friends & Influence People' and adapted for the modern tech hiring landscape.",
      author: "Rakesh K",
      authorRole: "Senior Tech Lead",
      date: "August 7, 2025",
      readTime: "8 min read",
      content: `
      <p>Technical interviews are often seen as a pure test of coding ability. You get a problem, you write an algorithm, you solve it, you get hired. Right? <strong>Wrong.</strong></p>
      
      <p>While technical proficiency is the baseline, what often separates a "Hire" from a "Strong Hire" (or a rejection) are the soft skills—how you communicate, how you handle pressure, and how you make the interviewer feel during the process.</p>
      
      <h2 id="1-don-t-criticize-condemn-or-complain">1. Don't Criticize, Condemn, or Complain</h2>
      <p>When asked about previous projects or employers, never speak negatively. If you faced legacy code or bad management, frame it as a challenge you navigated, not a burden you suffered. Complaining signals a lack of ownership.</p>
      
      <h2 id="2-give-honest-and-sincere-appreciation">2. Give Honest and Sincere Appreciation</h2>
      <p>If the interviewer gives you a hint, don't just say "Oh, right." Say, "That's a great point, I hadn't considered that edge case." Acknowledging their input creates a collaborative atmosphere rather than an adversarial one.</p>
      
      <div class="highlight-box">
         <strong>Pro Tip:</strong> Treat the interview like a pair programming session with a future colleague, not an exam with a proctor.
      </div>

      <h2 id="3-arouse-in-the-other-person-an-eager-want">3. Arouse in the Other Person an Eager Want</h2>
      <p>Show excitement about the specific problems the company is solving. Ask questions that show you've done your research. "I saw your team recently migrated to GraphQL, how has that impacted your client-side caching strategy?"</p>
      
      <h2 id="4-become-genuinely-interested-in-other-people">4. Become Genuinely Interested in Other People</h2>
      <p>At the end of the interview, ask the interviewer about <em>their</em> experience. "What's the most interesting challenge you've solved here in the last six months?" People love talking about their own work.</p>

      <h2 id="5-smile">5. Smile</h2>
      <p>It sounds simple, but coding interviews are stressful. If you can maintain a positive demeanor even when you're stuck, it shows resilience. A smile puts both you and the interviewer at ease.</p>

      <h2 id="6-be-a-good-listener">6. Be a Good Listener</h2>
      <p>Listen to the requirements carefully. Repeat them back. "So, if I understand correctly, we are optimizing for read-heavy traffic, correct?" This prevents you from solving the wrong problem.</p>

      <h3>Conclusion</h3>
      <p>Mastering LeetCode is necessary, but mastering human interaction is what will accelerate your career. Next time you walk into an interview, bring your empathy as well as your algorithms.</p>
    `,
      toc: [
         { id: "1-don-t-criticize-condemn-or-complain", text: "1. Don't Criticize, Condemn, or Complain" },
         { id: "2-give-honest-and-sincere-appreciation", text: "2. Give Honest and Sincere Appreciation" },
         { id: "3-arouse-in-the-other-person-an-eager-want", text: "3. Arouse in the Other Person an Eager Want" },
         { id: "4-become-genuinely-interested-in-other-people", text: "4. Become Genuinely Interested in Other People" },
         { id: "5-smile", text: "5. Smile" },
         { id: "6-be-a-good-listener", text: "6. Be a Good Listener" }
      ]
   },
   "default": {
      title: "Article Not Found",
      subtitle: "The article you are looking for does not exist or has been moved.",
      author: "System",
      date: "N/A",
      readTime: "0 min",
      content: "<p>Please check the URL or go back to the articles page.</p>",
      toc: []
   }
};

const CodeBlock = ({ code, language = 'javascript' }: { code: string, language?: string }) => (
   <div className="my-8 rounded-xl overflow-hidden bg-[#1e1e1e] border border-white/10 shadow-lg">
      <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-white/5">
         <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
         </div>
         <span className="text-xs text-gray-500 font-mono uppercase">{language}</span>
      </div>
      <div className="p-4 overflow-x-auto">
         <pre className="font-mono text-sm text-gray-300">
            <code>{code.trim()}</code>
         </pre>
      </div>
   </div>
);

export const ArticleDetail: React.FC = () => {
   const { slug } = useParams<{ slug: string }>();
   const article = articleDatabase[slug || ""] || articleDatabase["6-ways-to-win-tech-interview"]; // Fallback for demo
   const [activeSection, setActiveSection] = useState<string>("");

   const { scrollYProgress } = useScroll();
   const scaleX = useSpring(scrollYProgress, {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001
   });

   useEffect(() => {
      const handleScroll = () => {
         const headings = document.querySelectorAll('h2[id], h3[id]');
         let current = '';
         headings.forEach((heading) => {
            const top = heading.getBoundingClientRect().top;
            if (top < 150) {
               current = heading.id;
            }
         });
         setActiveSection(current);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   // Helper to inject HTML content safely (for demo purposes)
   // In a real app, use a proper Markdown renderer
   const renderContent = () => {
      // If it's the specific article, we might inject React components manually for better demo
      if (slug === "react-hooks-beginners") {
         return (
            <>
               <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class.
               </p>
               <h2 id="why-hooks" className="text-2xl font-bold text-white mb-4 mt-12 scroll-mt-32">Why Hooks?</h2>
               <p className="mb-6 text-gray-400 leading-relaxed">
                  Before hooks, reusing stateful logic between components was difficult. Higher-order components and render props tried to solve this but introduced "wrapper hell". Hooks allow you to extract stateful logic from a component so it can be tested independently and reused.
               </p>
               <CodeBlock code={`
import React, { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
            `} />
               <h2 id="use-effect" className="text-2xl font-bold text-white mb-4 mt-12 scroll-mt-32">The useEffect Hook</h2>
               <p className="mb-6 text-gray-400 leading-relaxed">
                  Data fetching, setting up a subscription, and manually changing the DOM in React components are all examples of side effects. \`useEffect\` lets you perform side effects in function components.
               </p>
            </>
         )
      }

      return <div dangerouslySetInnerHTML={{ __html: article.content }} className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-headings:font-bold prose-p:text-gray-400 prose-p:leading-relaxed prose-a:text-brand-yellow prose-strong:text-white prose-li:text-gray-400 prose-code:text-brand-yellow prose-code:bg-white/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:font-normal" />
   };

   return (
      <div className="min-h-screen bg-[#171717] pt-20">

         {/* Scroll Progress Bar */}
         <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-brand-yellow origin-left z-50"
            style={{ scaleX }}
         />

         {/* Hero Section */}
         <section className="relative pt-20 pb-16 px-4 border-b border-white/5 bg-gradient-to-b from-[#FFD439]/5 via-[#171717] to-[#171717]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,212,57,0.05),transparent_40%)] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto text-center relative z-10">
               <div className="flex items-center justify-center gap-2 text-xs font-bold tracking-widest text-gray-500 uppercase mb-6">
                  <Link to="/articles" className="hover:text-brand-yellow transition-colors">Articles</Link>
                  <ChevronRight size={12} />
                  <span className="text-gray-300">Engineering</span>
               </div>

               <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6 leading-tight">
                  {article.title}
               </h1>

               <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8">
                  {article.subtitle}
               </p>

               <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                     <img src="https://picsum.photos/id/1062/40/40" alt={article.author} className="w-8 h-8 rounded-full border border-white/10" />
                     <div className="flex flex-col text-left">
                        <span className="text-white font-bold leading-none">{article.author}</span>
                        <span className="text-[10px] mt-0.5">{article.authorRole || "Author"}</span>
                     </div>
                  </div>
                  <div className="h-8 w-[1px] bg-white/10"></div>
                  <div className="flex items-center gap-2">
                     <Calendar size={16} />
                     <span>{article.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <Clock size={16} />
                     <span>{article.readTime}</span>
                  </div>
               </div>
            </div>
         </section>

         {/* Main Content Area */}
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

               {/* Article Content (Left) */}
               <div className="lg:col-span-8 lg:col-start-2">

                  {/* Custom CSS for the injected content */}
                  <style>{`
                  h2 { font-size: 1.75rem; margin-top: 3rem; margin-bottom: 1rem; color: white; font-weight: 700; scroll-margin-top: 120px; }
                  h3 { font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem; color: white; font-weight: 600; scroll-margin-top: 120px; }
                  p { margin-bottom: 1.5rem; line-height: 1.8; color: #9ca3af; font-size: 1.125rem; }
                  strong { color: white; font-weight: 600; }
                  .highlight-box { background: rgba(255, 212, 57, 0.05); border-left: 4px solid #FFD439; padding: 1.5rem; margin: 2rem 0; border-radius: 0 0.5rem 0.5rem 0; color: #d1d5db; }
                `}</style>

                  <div className="article-content">
                     {renderContent()}
                  </div>

                  {/* Tags / Footer of Article */}
                  <div className="mt-16 pt-8 border-t border-white/10">
                     <div className="flex flex-wrap gap-2 mb-8">
                        {["Career", "Soft Skills", "Interview", "Tech"].map(tag => (
                           <span key={tag} className="px-3 py-1 rounded-full bg-white/5 text-gray-400 text-sm border border-white/5 hover:border-white/20 transition-colors cursor-pointer">
                              #{tag}
                           </span>
                        ))}
                     </div>

                     {/* Author Bio Box */}
                     <div className="bg-[#0a0a0a] rounded-2xl p-6 border border-white/5 flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
                        <img src="https://picsum.photos/id/1062/100/100" alt={article.author} className="w-20 h-20 rounded-full object-cover border-2 border-brand-yellow/20" />
                        <div className="flex-1">
                           <h4 className="text-white font-bold text-lg mb-1">Written by {article.author}</h4>
                           <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                              Senior Engineer passionate about helping developers level up their skills. I write about architecture, devops, and career growth.
                           </p>
                           <div className="flex justify-center sm:justify-start gap-4">
                              <button className="p-2 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all"><Twitter size={16} /></button>
                              <button className="p-2 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all"><Linkedin size={16} /></button>
                           </div>
                        </div>
                     </div>
                  </div>

               </div>

               {/* Sidebar (Right) - TOC & Share */}
               <div className="hidden lg:block lg:col-span-3">
                  <div className="sticky top-32 space-y-8">

                     {/* Table of Contents */}
                     {article.toc && article.toc.length > 0 && (
                        <div>
                           <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                              <span className="w-1 h-4 bg-brand-yellow rounded-full"></span>
                              On this page
                           </h4>
                           <nav className="flex flex-col space-y-1 relative border-l border-white/10 pl-4">
                              {article.toc.map((item: any) => (
                                 <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    className={`text-sm py-1 transition-colors leading-snug hover:text-white ${activeSection === item.id ? 'text-brand-yellow font-medium' : 'text-gray-500'}`}
                                 >
                                    {item.text.replace(/^\d+\.\s/, '')} {/* Strip numbers for TOC */}
                                 </a>
                              ))}
                           </nav>
                        </div>
                     )}

                     {/* Share Widget */}
                     <div>
                        <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                           <span className="w-1 h-4 bg-brand-yellow rounded-full"></span>
                           Share this
                        </h4>
                        <div className="flex flex-col gap-2">
                           <button className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all border border-transparent hover:border-white/10 text-sm font-medium">
                              <Twitter size={16} className="text-[#1DA1F2]" />
                              Share on Twitter
                           </button>
                           <button className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all border border-transparent hover:border-white/10 text-sm font-medium">
                              <Linkedin size={16} className="text-[#0077b5]" />
                              Share on LinkedIn
                           </button>
                           <button className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all border border-transparent hover:border-white/10 text-sm font-medium">
                              <LinkIcon size={16} />
                              Copy Link
                           </button>
                        </div>
                     </div>

                     {/* Newsletter Mini */}
                     <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1F1F1F] to-[#0a0a0a] border border-white/5">
                        <h4 className="text-white font-bold mb-2">Weekly Newsletter</h4>
                        <p className="text-xs text-gray-400 mb-4">Get the latest articles and resources sent straight to your inbox.</p>
                        <input type="email" placeholder="Your email" className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-yellow/50 mb-3" />
                        <button className="w-full py-2 bg-brand-yellow text-black text-sm font-bold rounded-lg hover:bg-[#ffe066] transition-colors">Subscribe</button>
                     </div>

                  </div>
               </div>

            </div>
         </div>

         {/* Read Next Section */}
         <div className="border-t border-white/5 py-16 bg-[#171717]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <h3 className="text-2xl font-bold text-white mb-8">Read Next</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                  <CompactBlogCard
                     slug="understanding-microservices"
                     category="DEVOPS"
                     categoryColor="text-brand-yellow"
                     title="Understanding Microservices Architecture"
                     description="A deep dive into breaking down monoliths for scalability and maintainability."
                  />
                  <CompactBlogCard
                     slug="react-hooks-beginners"
                     category="REACT"
                     categoryColor="text-blue-400"
                     title="Mastering React Hooks for Beginners"
                     description="Simplify your state management with clean and efficient code using hooks."
                  />
                  <CompactBlogCard
                     slug="system-design-basics"
                     category="SYSTEM DESIGN"
                     categoryColor="text-green-400"
                     title="Building Scalable Systems"
                     description="Key principles for high availability, fault tolerance, and load balancing."
                  />
               </div>
            </div>
         </div>

      </div>
   );
};
