import React, { useState, useEffect } from 'react';
import { ChevronDown, ExternalLink, Menu, X, ArrowRight, FileText, MessageSquare, BookOpen, Layout, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

interface NavLinkProps {
  label: string;
  to: string;
  hasDropdown?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ label, to, hasDropdown }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`
        flex items-center gap-1 text-sm font-medium transition-colors
        ${isActive ? 'text-brand-yellow' : 'text-gray-300 hover:text-white'}
      `}
    >
      {label}
      {hasDropdown && <ChevronDown size={14} className="mt-0.5" />}
    </Link>
  );
};

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOthersOpen, setIsOthersOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsOthersOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-[#171717]/80 backdrop-blur-md border-b border-white/5 py-0'
          : 'bg-transparent border-transparent py-4'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between relative">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0">
              {/* Placeholder for the bird logo */}
              <img src="https://picsum.photos/id/1062/40/40" alt="Logo" className="w-8 h-8 rounded-full object-cover opacity-80" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Coder's Gyan</span>
            <div className={`h-6 w-[1px] bg-gray-700 mx-2 hidden md:block transition-opacity duration-300 ${isScrolled ? 'opacity-100' : 'opacity-0'}`}></div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink label="Home" to="/" />
            <NavLink label="Courses" to="/courses" />
            <NavLink label="Coding labs" to="/coding-labs" />
            <NavLink label="Membership" to="/membership" />

            {/* Others Dropdown Trigger */}
            <div className="relative">
              <button
                className={`flex items-center gap-1 text-sm font-medium transition-colors outline-none ${isOthersOpen ? 'text-brand-yellow' : 'text-gray-300 hover:text-white'}`}
                onClick={() => setIsOthersOpen(!isOthersOpen)}
              >
                Others
                <ChevronDown size={14} className={`mt-0.5 transition-transform duration-200 ${isOthersOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Desktop Dropdown Menu */}
              <AnimatePresence>
                {isOthersOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-[-200px] mt-8 w-[900px] bg-[#000] border border-white/10 rounded-2xl shadow-2xl p-3 grid grid-cols-5 gap-3 overflow-hidden z-[60]"
                  >
                    {/* Card 1: Articles */}
                    <Link to="/articles" onClick={() => setIsOthersOpen(false)} className="group relative bg-[#FFD439] rounded-xl p-5 flex flex-col justify-between h-52 overflow-hidden hover:brightness-110 transition-all">
                      <div className="absolute right-[-20px] top-[-20px] opacity-10 rotate-12">
                        <FileText size={120} className="text-black" />
                      </div>
                      <div className="w-12 h-12 bg-black/10 rounded-xl flex items-center justify-center mb-4">
                        <FileText size={24} className="text-black" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold tracking-widest text-black/60 uppercase block mb-1">ARTICLES</span>
                        <span className="text-xl font-bold text-black leading-tight flex items-center gap-1">
                          Latest Articles
                          <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                        </span>
                      </div>
                    </Link>

                    {/* Card 2: Testimonials */}
                    <Link to="/testimonials" onClick={() => setIsOthersOpen(false)} className="group relative bg-[#0a0a0a] rounded-xl p-5 flex flex-col justify-between h-52 hover:bg-[#171717] transition-colors border border-white/5 hover:border-white/10">
                      <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-4 text-gray-400 group-hover:text-white transition-colors">
                        <MessageSquare size={24} />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase block mb-1">TESTIMONIALS</span>
                        <span className="text-xl font-bold text-white leading-tight flex items-center gap-1">
                          Success Stories
                          <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                        </span>
                      </div>
                    </Link>

                    {/* Card 3: Resources - Coming Soon */}
                    <div className="group relative bg-[#0a0a0a] rounded-xl p-5 flex flex-col justify-between h-52 border border-white/5 opacity-60 cursor-not-allowed">
                      <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-4 text-gray-500">
                        <BookOpen size={24} />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold tracking-widest text-[#FFD439] uppercase block mb-1">COMING SOON..</span>
                        <span className="text-xl font-bold text-gray-400 leading-tight">
                          Resource & Guides
                        </span>
                      </div>
                    </div>

                    {/* Card 4: Learning Paths - Coming Soon */}
                    <div className="group relative bg-[#0a0a0a] rounded-xl p-5 flex flex-col justify-between h-52 border border-white/5 opacity-60 cursor-not-allowed">
                      <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-4 text-gray-500">
                        <Layout size={24} />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold tracking-widest text-[#FFD439] uppercase block mb-1">COMING SOON..</span>
                        <span className="text-xl font-bold text-gray-400 leading-tight">
                          Learning Paths
                        </span>
                      </div>
                    </div>

                    {/* Card 5: Quiz - Coming Soon */}
                    <div className="group relative bg-[#0a0a0a] rounded-xl p-5 flex flex-col justify-between h-52 border border-white/5 opacity-60 cursor-not-allowed">
                      <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-4 text-gray-500">
                        <Trophy size={24} />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold tracking-widest text-[#FFD439] uppercase block mb-1">COMING SOON..</span>
                        <span className="text-xl font-bold text-gray-400 leading-tight">
                          Quiz & Hackathons
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Actions (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-white hover:text-brand-yellow transition-colors">
              Login
            </Link>
            <Link to="/dashboard" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#27272a] hover:bg-[#3f3f46] text-white text-sm font-medium border border-white/10 transition-all group">
              Dashboard
              <ExternalLink size={14} className="text-gray-400 group-hover:text-white transition-colors" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="md:hidden text-gray-300 hover:text-white p-2 focus:outline-none active:scale-95 transition-transform"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu size={28} />
          </button>

        </div>
      </nav>

      {/* Backdrop for closing dropdown */}
      {isOthersOpen && (
        <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setIsOthersOpen(false)} />
      )}

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-[#171717] flex flex-col overflow-y-auto"
          >
            {/* Mobile Menu Header - Close Button */}
            <div className="px-4 sm:px-6 h-20 flex items-center justify-end shrink-0">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-brand-yellow hover:text-white transition-colors p-2 focus:outline-none active:scale-95 transition-transform"
                aria-label="Close Menu"
              >
                <X size={32} />
              </button>
            </div>

            {/* Menu Content */}
            <div className="flex-1 px-6 pb-8 flex flex-col">

              <div className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-8">MENU</div>

              <div className="flex flex-col gap-5 mb-8">
                <Link to="/" className="text-2xl font-bold text-brand-yellow" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                <Link to="/courses" className="text-2xl font-bold text-white hover:text-brand-yellow transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Courses</Link>
                <Link to="/coding-labs" className="text-2xl font-bold text-white hover:text-brand-yellow transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Coding labs</Link>
                <Link to="/articles" className="text-2xl font-bold text-white hover:text-brand-yellow transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Articles</Link>
                <Link to="/membership" className="text-2xl font-bold text-white hover:text-brand-yellow transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Membership</Link>
              </div>

              <div className="flex flex-col gap-4 mb-10 border-t border-white/5 pt-8">
                <div className="flex items-center gap-3 text-gray-500 group cursor-not-allowed select-none">
                  <span className="text-lg font-medium">Learning paths</span>
                  <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-gray-500 font-medium whitespace-nowrap">Coming soon..</span>
                </div>
                <div className="flex items-center gap-3 text-gray-500 group cursor-not-allowed select-none">
                  <span className="text-lg font-medium">Resource & guides</span>
                  <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-gray-500 font-medium whitespace-nowrap">Coming soon..</span>
                </div>
                <div className="flex items-center gap-3 text-gray-500 group cursor-not-allowed select-none">
                  <span className="text-lg font-medium">Hackathons</span>
                  <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-gray-500 font-medium whitespace-nowrap">Coming soon..</span>
                </div>
              </div>

              <div className="mt-auto">
                <div className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-3">MAIL US</div>
                <a href="mailto:hello@codersgyan.com" className="text-white text-lg font-medium block mb-8 hover:text-brand-yellow transition-colors">hello@codersgyan.com</a>

                <div className="flex flex-col gap-3">
                  <Link to="/dashboard" className="w-full bg-brand-yellow text-black font-bold py-3.5 rounded-full flex items-center justify-center gap-2 hover:bg-[#ffe066] transition-colors shadow-lg shadow-brand-yellow/10" onClick={() => setIsMobileMenuOpen(false)}>
                    Dashboard <ExternalLink size={18} />
                  </Link>
                  <Link to="/login" className="w-full bg-[#262626] border border-white/10 text-white font-bold py-3.5 rounded-full flex items-center justify-center gap-2 hover:bg-[#333] transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                    Login <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};