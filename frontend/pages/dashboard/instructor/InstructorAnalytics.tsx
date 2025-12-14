import React from 'react';
import { BarChart3, TrendingUp, Users, DollarSign, Eye, Clock } from 'lucide-react';

/**
 * Instructor Analytics Page
 * Placeholder UI - Analytics for instructor's courses
 */
export const InstructorAnalytics: React.FC = () => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Course Analytics</h2>
                <p className="text-zinc-500 dark:text-zinc-400">Track your course performance and student engagement</p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { icon: Users, label: 'Total Students', value: '2,090', change: '+156 this month' },
                    { icon: DollarSign, label: 'Total Earnings', value: '₹87.3L', change: '+₹4.2L this month' },
                    { icon: Eye, label: 'Course Views', value: '45.2K', change: '+12% vs last month' },
                    { icon: Clock, label: 'Avg. Watch Time', value: '45 min', change: '+8% vs last month' },
                ].map((metric) => (
                    <div key={metric.label} className="bg-white dark:bg-zinc-800 p-5 rounded-xl border border-zinc-200 dark:border-zinc-700">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-brand-yellow/10 rounded-lg">
                                <metric.icon size={20} className="text-brand-yellow" />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-zinc-900 dark:text-white">{metric.value}</p>
                        <p className="text-sm text-zinc-500">{metric.label}</p>
                        <p className="text-xs text-green-500 mt-1 flex items-center gap-1">
                            <TrendingUp size={12} />
                            {metric.change}
                        </p>
                    </div>
                ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Earnings Chart */}
                <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl border border-zinc-200 dark:border-zinc-700">
                    <h3 className="font-semibold text-zinc-900 dark:text-white mb-4">Earnings Over Time</h3>
                    <div className="h-64 flex items-center justify-center bg-zinc-50 dark:bg-zinc-900/50 rounded-lg">
                        <div className="text-center">
                            <BarChart3 size={48} className="text-zinc-300 dark:text-zinc-600 mx-auto mb-2" />
                            <p className="text-sm text-zinc-400">Chart will be rendered here</p>
                        </div>
                    </div>
                </div>

                {/* Enrollments Chart */}
                <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl border border-zinc-200 dark:border-zinc-700">
                    <h3 className="font-semibold text-zinc-900 dark:text-white mb-4">Student Enrollments</h3>
                    <div className="h-64 flex items-center justify-center bg-zinc-50 dark:bg-zinc-900/50 rounded-lg">
                        <div className="text-center">
                            <TrendingUp size={48} className="text-zinc-300 dark:text-zinc-600 mx-auto mb-2" />
                            <p className="text-sm text-zinc-400">Chart will be rendered here</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Course Performance Table */}
            <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700">
                <div className="p-4 border-b border-zinc-200 dark:border-zinc-700">
                    <h3 className="font-semibold text-zinc-900 dark:text-white">Course Performance</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-zinc-50 dark:bg-zinc-900/50">
                            <tr>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-zinc-500 uppercase">Course</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-zinc-500 uppercase">Students</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-zinc-500 uppercase">Completion Rate</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-zinc-500 uppercase">Rating</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-zinc-500 uppercase">Earnings</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                            {[
                                { name: 'Complete Web Development Bootcamp', students: 1234, completion: '78%', rating: 4.8, earnings: '₹61.7L' },
                                { name: 'React Mastery Course', students: 856, completion: '82%', rating: 4.9, earnings: '₹25.6L' },
                            ].map((course, i) => (
                                <tr key={i} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/30">
                                    <td className="px-6 py-4 font-medium text-zinc-900 dark:text-white">{course.name}</td>
                                    <td className="px-6 py-4 text-zinc-500">{course.students}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-green-500 rounded-full"
                                                    style={{ width: course.completion }}
                                                />
                                            </div>
                                            <span className="text-sm text-zinc-500">{course.completion}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-yellow-500">★</span> {course.rating}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-zinc-900 dark:text-white">{course.earnings}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Placeholder Notice */}
            <div className="text-center py-4">
                <p className="text-sm text-zinc-400">
                    📌 This is a placeholder UI. Create instructor analytics APIs to enable real data.
                </p>
            </div>
        </div>
    );
};
