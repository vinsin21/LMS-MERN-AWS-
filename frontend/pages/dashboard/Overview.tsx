import React from 'react';
import { BookOpen, CheckCircle, Clock, Award, ArrowRight, PlayCircle, Zap, Layers, Box } from 'lucide-react';
import { mockUser } from '../../data/mockData';

const StatCard = ({ icon: Icon, label, value, subtext }: any) => (
    <div className="bg-white dark:bg-[#27272a] p-6 rounded-xl flex flex-col justify-between h-40 hover:bg-zinc-50 dark:hover:bg-[#3f3f46] transition-colors group cursor-pointer border border-zinc-200 dark:border-zinc-800">
        <div className="flex justify-between items-start">
            <div className="p-3 bg-zinc-100 dark:bg-[#18181b] rounded-lg text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                <Icon size={24} />
            </div>
            {subtext && (
                <span className="text-xs font-bold text-zinc-500 dark:text-zinc-500 bg-zinc-100 dark:bg-[#18181b] px-2 py-1 rounded-md group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
                    {subtext}
                </span>
            )}
        </div>

        <div>
            <h4 className="text-3xl font-bold text-zinc-900 dark:text-white mb-1 tracking-tight">{value}</h4>
            <p className="text-zinc-500 text-sm font-medium">{label}</p>
        </div>
    </div>
);

export const Overview: React.FC = () => {
    const activeCourse = mockUser.enrolledCourses.find(c => c.progress > 0 && c.progress < 100) || mockUser.enrolledCourses[0];

    return (
        <div className="space-y-8">

            {/* Welcome Section */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">Hey, {mockUser.name}.</h2>
                <p className="text-zinc-500">Here's what's happening with your learning today.</p>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Column: Stats */}
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <StatCard
                        icon={Zap}
                        label="Courses in Progress"
                        value={mockUser.stats.coursesInProgress}
                        subtext="Active"
                    />
                    <StatCard
                        icon={CheckCircle}
                        label="Completed"
                        value={mockUser.stats.coursesCompleted}
                        subtext="All Time"
                    />
                    <StatCard
                        icon={Clock}
                        label="Hours Learned"
                        value={mockUser.stats.hoursLearned}
                    />
                    <StatCard
                        icon={Award}
                        label="Certificates"
                        value={mockUser.stats.certificatesEarned}
                    />

                    {/* Continue Learning (Wide Card) */}
                    {activeCourse && (
                        <div className="sm:col-span-2 bg-white dark:bg-[#27272a] p-8 rounded-xl relative overflow-hidden group cursor-pointer hover:bg-zinc-50 dark:hover:bg-[#3f3f46] transition-colors border border-zinc-200 dark:border-zinc-800">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-brand-yellow/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-8">
                                <div className="w-full sm:w-40 aspect-video sm:aspect-square rounded-lg overflow-hidden bg-zinc-100 dark:bg-[#18181b]">
                                    <img src={activeCourse.thumbnail} alt={activeCourse.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                </div>

                                <div className="flex-1 text-center sm:text-left">
                                    <div className="flex items-center justify-center sm:justify-start gap-2 mb-3">
                                        <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse"></span>
                                        <span className="text-xs font-bold text-brand-yellow uppercase tracking-widest">In Progress</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2 leading-tight">{activeCourse.title}</h3>
                                    <p className="text-zinc-500 text-sm mb-6">Continue where you left off in Lesson {activeCourse.completedLessons + 1}</p>

                                    <div className="w-full bg-zinc-100 dark:bg-[#18181b] h-1.5 rounded-full overflow-hidden">
                                        <div className="h-full bg-zinc-900 dark:bg-white rounded-full" style={{ width: `${activeCourse.progress}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column: Quick Actions / Thoughts */}
                <div className="space-y-6">

                    {/* "New Drops" / Recommended */}
                    <div className="bg-white dark:bg-[#27272a] p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-zinc-900 dark:text-white">Recommended</h3>
                            <button className="text-xs font-bold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">View All</button>
                        </div>

                        <div className="space-y-4">
                            <div className="group cursor-pointer">
                                <div className="aspect-video rounded-lg bg-zinc-100 dark:bg-[#18181b] mb-3 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                                        <span className="text-xs font-bold text-white">View Course</span>
                                    </div>
                                </div>
                                <h4 className="font-bold text-zinc-900 dark:text-white text-sm mb-1 group-hover:text-brand-yellow transition-colors">Advanced React Patterns</h4>
                                <p className="text-xs text-zinc-500">By Sarah Drasner</p>
                            </div>
                            <div className="group cursor-pointer">
                                <div className="aspect-video rounded-lg bg-zinc-100 dark:bg-[#18181b] mb-3 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                                        <span className="text-xs font-bold text-white">View Course</span>
                                    </div>
                                </div>
                                <h4 className="font-bold text-zinc-900 dark:text-white text-sm mb-1 group-hover:text-brand-yellow transition-colors">System Design Interview</h4>
                                <p className="text-xs text-zinc-500">By Alex Xu</p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="bg-white dark:bg-[#27272a] p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
                        <h3 className="font-bold text-zinc-900 dark:text-white mb-4">Quick Actions</h3>
                        <div className="space-y-2">
                            <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-[#3f3f46] transition-colors text-left group">
                                <div className="w-8 h-8 rounded-md bg-zinc-100 dark:bg-[#18181b] flex items-center justify-center text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white group-hover:bg-zinc-200 dark:group-hover:bg-[#52525b] transition-colors">
                                    <Layers size={16} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-zinc-900 dark:text-white">Browse Catalog</p>
                                    <p className="text-xs text-zinc-500">Find new courses</p>
                                </div>
                            </button>
                            <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-[#3f3f46] transition-colors text-left group">
                                <div className="w-8 h-8 rounded-md bg-zinc-100 dark:bg-[#18181b] flex items-center justify-center text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white group-hover:bg-zinc-200 dark:group-hover:bg-[#52525b] transition-colors">
                                    <Box size={16} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-zinc-900 dark:text-white">Community</p>
                                    <p className="text-xs text-zinc-500">Join discussions</p>
                                </div>
                            </button>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
};
