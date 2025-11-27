import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Award, Settings } from 'lucide-react';

export const BottomNav: React.FC = () => {
    const navItems = [
        { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
        { icon: BookOpen, label: 'Courses', path: '/dashboard/courses' },
        { icon: Award, label: 'Certificates', path: '/dashboard/certificates' },
        { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-[#18181b]/90 backdrop-blur-lg border-t border-zinc-200 dark:border-zinc-800 px-6 py-4 z-50 transition-colors duration-300">
            <div className="flex items-center justify-between max-w-sm mx-auto">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === '/dashboard'}
                        className={({ isActive }) => `
              flex flex-col items-center gap-1 transition-colors
              ${isActive ? 'text-zinc-900 dark:text-brand-yellow' : 'text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300'}
            `}
                    >
                        {({ isActive }) => (
                            <>
                                <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                                <span className="text-[10px] font-medium">{item.label}</span>
                            </>
                        )}
                    </NavLink>
                ))}
            </div>
        </div>
    );
};
