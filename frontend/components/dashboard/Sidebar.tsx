import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { getNavigationForRole } from '../../config/navigationConfig';

export const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    // Construct avatar URL from S3 key or use null
    const avatarUrl = user?.avatar
        ? `${import.meta.env.VITE_CLOUDFRONT_URL || ''}/${user.avatar}`
        : null;

    // Get role-based navigation items
    const navItems = user ? getNavigationForRole(user.role) : [];

    return (
        <aside className="hidden md:flex flex-col w-72 h-screen sticky top-0 bg-white dark:bg-[#18181b] border-r border-zinc-200 dark:border-zinc-800 p-6 transition-colors duration-300">

            {/* User Profile (Top) */}
            <div
                onClick={() => navigate('/dashboard/settings')}
                className="flex items-center gap-4 mb-12 px-2 cursor-pointer hover:bg-zinc-50 dark:hover:bg-white/5 p-2 rounded-xl transition-colors group"
            >
                <div className="relative">
                    {avatarUrl ? (
                        <img
                            src={avatarUrl}
                            alt={user?.fullName || 'User'}
                            className="w-10 h-10 rounded-full object-cover ring-2 ring-zinc-100 dark:ring-white/10"
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-brand-yellow/20 flex items-center justify-center ring-2 ring-zinc-100 dark:ring-white/10">
                            <span className="text-brand-yellow font-semibold text-sm">
                                {user?.fullName?.charAt(0).toUpperCase() || 'U'}
                            </span>
                        </div>
                    )}
                </div>
                <div>
                    <h3 className="text-zinc-900 dark:text-white font-bold text-sm leading-tight group-hover:text-brand-yellow transition-colors">
                        {user?.fullName || 'User'}
                    </h3>
                    <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-0.5 capitalize">
                        {user?.role || 'Student'}
                    </p>
                </div>
                <button className="ml-auto text-zinc-400 hover:text-zinc-900 dark:text-zinc-600 dark:hover:text-white transition-colors">
                    <ChevronRight size={16} />
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === '/dashboard'}
                        className={({ isActive }) => `
              flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group
              ${isActive
                                ? 'bg-zinc-100 dark:bg-[#27272a] text-zinc-900 dark:text-white'
                                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-white/5'
                            }
            `}
                    >
                        <div className="flex items-center gap-3">
                            <item.icon size={18} className="opacity-70 group-hover:opacity-100 transition-opacity" />
                            <span>{item.label}</span>
                        </div>
                        {item.count !== null && (
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${location.pathname === item.path
                                ? 'bg-zinc-200 dark:bg-white/10 text-zinc-900 dark:text-white'
                                : 'bg-zinc-100 dark:bg-[#27272a] text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-300'
                                }`}>
                                {item.count}
                            </span>
                        )}
                    </NavLink>
                ))}
            </nav>



            {/* Footer / Logout */}
            <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-zinc-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/5 transition-all group"
                >
                    <LogOut size={18} />
                    Sign Out
                </button>
            </div>

        </aside>
    );
};

