import React from 'react';

export const Community: React.FC = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Content */}
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase block mb-3">
            Connect, Learn & Grow
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Join Coder's Gyan Community
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-6">
            Learn, connect, and grow with fellow coders on YouTube, LinkedIn, and Discord. Be part of a supportive network that's passionate about tech and growth.
          </p>
          
          <div className="relative inline-block">
            <span className="font-cursive text-xl sm:text-2xl text-gray-500/80 -rotate-1 block tracking-wide">
              Let's build together – Join us today
            </span>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative">
          
          {/* Decorative Arrow for LinkedIn (Top Right) */}
          <div className="hidden lg:block absolute -top-12 -right-4 z-20 pointer-events-none">
             <div className="relative">
                <span className="font-cursive text-gray-500 text-lg absolute -top-5 -left-4 -rotate-12">Click to join</span>
                <svg width="40" height="50" viewBox="0 0 50 60" fill="none" className="text-gray-600 rotate-6 opacity-80">
                   <path d="M10 10 C 10 30, 30 40, 30 55" stroke="currentColor" strokeWidth="1" fill="none" />
                   <path d="M30 55 L 24 48 M 30 55 L 38 48" stroke="currentColor" strokeWidth="1" fill="none" />
                </svg>
             </div>
          </div>

          {/* YouTube Card - Spans 2 columns on large screens */}
          <div className="md:col-span-2 lg:col-span-2 group relative bg-[#0a0a0a] border border-white/5 rounded-xl p-6 overflow-hidden h-64 flex flex-col justify-between hover:bg-red-500/10 hover:border-red-500/20 hover:backdrop-blur-sm transition-all duration-300 shadow-xl">
            
            {/* Top Right Play Button Icon */}
            <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-30 transition-opacity">
               <div className="w-14 h-10 bg-white rounded-lg flex items-center justify-center">
                  <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-black border-b-[5px] border-b-transparent ml-0.5"></div>
               </div>
            </div>
            
            {/* Content */}
            <div className="relative z-10 mt-1">
              <h3 className="text-4xl sm:text-5xl font-extrabold text-white mb-3 tracking-tight">126K+</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-[85%] font-medium">
                With over 126K+ subscribers on YouTube, with almost 7 million views, with entire playlists dedicated to tech.
              </p>
            </div>

            {/* Bottom Wave Graph Decoration */}
            <div className="absolute bottom-0 left-0 right-0 h-24 opacity-40 pointer-events-none translate-y-2">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 100">
                {/* Red line */}
                <path d="M0 70 C 40 70, 60 30, 100 50 C 140 70, 160 20, 200 40 C 240 60, 260 30, 300 50 C 340 70, 360 40, 400 60" 
                      stroke="#dc2626" strokeWidth="2" fill="none" className="drop-shadow-lg" />
                {/* Grey line */}
                <path d="M0 80 C 50 80, 70 50, 120 60 C 170 70, 190 40, 240 50 C 290 60, 310 40, 400 70" 
                      stroke="#525252" strokeWidth="1.5" fill="none" />
              </svg>
            </div>
          </div>

          {/* Discord Card */}
          <div className="group relative bg-[#0a0a0a] border border-white/5 rounded-xl p-6 overflow-hidden h-64 flex flex-col justify-center hover:bg-[#5865F2]/10 hover:border-[#5865F2]/20 hover:backdrop-blur-sm transition-all duration-300 shadow-xl">
            
            {/* Background Icon (Bottom Right Clipped) */}
            <div className="absolute -bottom-5 -right-5 w-32 h-32 opacity-[0.07] group-hover:opacity-[0.1] transition-opacity rotate-[-10deg]">
               <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-white">
                 <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1569 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z"/>
               </svg>
            </div>

            <div className="relative z-10 flex flex-col justify-center h-full">
              <h3 className="text-4xl sm:text-5xl font-extrabold text-white mb-3 tracking-tight">2.5K+</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-medium">
                Active members on Discord.
              </p>
            </div>
          </div>

          {/* LinkedIn Card */}
          <div className="group relative bg-[#0a0a0a] border border-white/5 rounded-xl p-6 overflow-hidden h-64 flex flex-col justify-center hover:bg-[#0077b5]/10 hover:border-[#0077b5]/20 hover:backdrop-blur-sm transition-all duration-300 shadow-xl">
            
            {/* Background Icon (Bottom Right Clipped) */}
            <div className="absolute -bottom-4 -right-2 w-40 h-40 opacity-[0.07] group-hover:opacity-[0.1] transition-opacity">
               <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-white">
                 <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
               </svg>
            </div>

            <div className="relative z-10 flex flex-col justify-center h-full">
              <h3 className="text-4xl sm:text-5xl font-extrabold text-white mb-3 tracking-tight">7K+</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-medium">
                Professional people on LinkedIn.
              </p>
            </div>
          </div>

          {/* Decorative Arrow for Subscribe (Bottom Left) */}
          <div className="absolute -bottom-8 left-0 z-20 pointer-events-none hidden lg:block">
             <div className="relative flex items-end">
                <span className="font-cursive text-gray-500 text-lg mb-4 -rotate-12 mr-2">Subscribe</span>
                <svg width="40" height="40" viewBox="0 0 50 50" fill="none" className="text-gray-600 -scale-x-100 rotate-12 opacity-80">
                   <path d="M10 40 C 20 30, 30 15, 40 5" stroke="currentColor" strokeWidth="1" fill="none" />
                   <path d="M40 5 L 35 12 M 40 5 L 30 5" stroke="currentColor" strokeWidth="1" fill="none" />
                </svg>
             </div>
          </div>

        </div>

      </div>
    </section>
  );
};