import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Bell, Search, Sun, Moon } from 'lucide-react';
import { Sidebar } from '../components/dashboard/Sidebar';
import { BottomNav } from '../components/dashboard/BottomNav';

export const DashboardLayout: React.FC = () => {
    const location = useLocation();
    const [isDarkMode, setIsDarkMode] = React.useState(true);

    React.useEffect(() => {
        // Check local storage or system preference on mount
        const savedTheme = localStorage.getItem('dashboardTheme');
        if (savedTheme) {
            setIsDarkMode(savedTheme === 'dark');
            if (savedTheme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        } else {
            document.documentElement.classList.add('dark'); // Default to dark
        }
    }, []);

    const toggleTheme = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        if (newMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('dashboardTheme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('dashboardTheme', 'light');
        }
    };

    const getPageTitle = () => {
        const path = location.pathname;
        if (path === '/dashboard') return 'Overview';
        if (path.includes('/courses')) return 'My Courses';
        if (path.includes('/certificates')) return 'Certificates';
        if (path.includes('/settings')) return 'Settings';
        return 'Dashboard';
    };

    return (
        <div className="min-h-screen bg-zinc-100 dark:bg-[#18181b] flex font-sans text-zinc-900 dark:text-zinc-100 transition-colors duration-300">

            {/* Desktop Sidebar */}
            <Sidebar />

            {/* Main Content Wrapper */}
            <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-0">

                {/* Header (Desktop & Mobile) */}
                <header className="h-20 px-6 md:px-10 flex items-center justify-between sticky top-0 z-30 bg-white/80 dark:bg-[#18181b]/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
                    <div>
                        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">{getPageTitle()}</h1>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 hidden md:block mt-1">Manage your learning journey</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors bg-white dark:bg-[#27272a] rounded-full border border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600"
                        >
                            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        <button className="relative p-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors bg-white dark:bg-[#27272a] rounded-full border border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-brand-yellow rounded-full ring-2 ring-white dark:ring-[#27272a]"></span>
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6 md:p-10 overflow-y-auto">
                    <div className="max-w-6xl mx-auto">
                        <Outlet />
                    </div>
                </main>

            </div>

            {/* Mobile Bottom Navigation */}
            <BottomNav />

        </div>
    );
};
