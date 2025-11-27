import React from 'react';
import { cn } from '../../lib/utils';
import { Link } from 'react-router-dom';
import {
  Twitter,
  Linkedin,
  Github,
  Youtube,
  Code2
} from 'lucide-react';

interface FooterLink {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  external?: boolean;
}
interface FooterLinkGroup {
  label: string;
  links: FooterLink[];
}

type StickyFooterProps = React.ComponentProps<'footer'>;

export function StickyFooter({ className, ...props }: StickyFooterProps) {
  return (
    <footer
      className={cn('relative w-full overflow-hidden pt-24 pb-32', className)}
      {...props}
    >
       {/* Top Gradient */}
       <div className="absolute inset-0 pointer-events-none [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0)_0%,rgba(0,0,0,1)_15%)]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(255,212,57,0.05),transparent_50%)]"></div>
       </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="flex flex-col xl:flex-row justify-between gap-12 xl:gap-24 mb-24">
          {/* Brand Section */}
          <div className="max-w-md">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0">
                <img src="https://picsum.photos/id/1062/40/40" alt="Logo" className="w-8 h-8 rounded-full object-cover opacity-80" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">Coder's Gyan</span>
            </div>
            <p className="text-gray-400 text-base leading-relaxed mb-8">
              Empowering developers to master the modern tech stack through comprehensive, hands-on learning experiences.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  className="w-10 h-10 rounded-full bg-[#0a0a0a] border border-white/10 flex items-center justify-center text-gray-400 hover:text-brand-yellow hover:border-brand-yellow/50 transition-all duration-300 hover:scale-110"
                  aria-label={link.title}
                >
                  <link.icon className="size-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Section */}
          <div className="hidden md:grid md:grid-cols-3 gap-10 md:gap-20">
            {footerLinkGroups.map((group) => (
              <div key={group.label}>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">{group.label}</h3>
                <ul className="space-y-4">
                  {group.links.map((link) => (
                    <li key={link.title}>
                      {link.external ? (
                        <a
                          href={link.href}
                          className="text-gray-400 hover:text-brand-yellow inline-flex items-center transition-colors duration-200 text-sm font-medium"
                        >
                          {link.title}
                        </a>
                      ) : (
                        <Link
                          to={link.href}
                          className="text-gray-400 hover:text-brand-yellow inline-flex items-center transition-colors duration-200 text-sm font-medium"
                        >
                          {link.title}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Coder's Gyan. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>

      {/* Big Background Text */}
      <div 
        className="bg-gradient-to-b from-white/10 via-white/5 to-transparent bg-clip-text text-transparent leading-none absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-[10%] font-bold tracking-tighter pointer-events-none select-none text-center z-0 whitespace-nowrap"
        style={{ fontSize: '23vw' }}
      >
        JOIN US
      </div>

      {/* Bottom Floating Logo */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <Link to="/" className="w-16 h-16 bg-[#0a0a0a] border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 group">
           <Code2 className="w-8 h-8 text-gray-500 group-hover:text-brand-yellow transition-colors" />
        </Link>
      </div>

    </footer>
  );
}

const socialLinks = [
  { title: 'Youtube', href: '#', icon: Youtube },
  { title: 'Twitter', href: '#', icon: Twitter },
  { title: 'LinkedIn', href: '#', icon: Linkedin },
  { title: 'GitHub', href: '#', icon: Github },
];

const footerLinkGroups: FooterLinkGroup[] = [
  {
    label: 'Platform',
    links: [
      { title: 'All Courses', href: '/courses' },
      { title: 'Coding Labs', href: '/coding-labs' },
      { title: 'Roadmaps', href: '/' }, // Anchored to home for now
      { title: 'Pro Membership', href: '/membership' },
    ],
  },
  {
    label: 'Community',
    links: [
      { title: 'Discord Server', href: '#', external: true },
      { title: 'Success Stories', href: '/testimonials' },
      { title: 'Events & Hackathons', href: '#' },
      { title: 'Blog / Articles', href: '/articles' },
    ],
  },
  {
    label: 'Company',
    links: [
      { title: 'About Us', href: '/about' },
      { title: 'Contact Support', href: '/contact' },
      { title: 'Become an Instructor', href: '#' },
      { title: 'Affiliate Program', href: '#' },
    ],
  },
];