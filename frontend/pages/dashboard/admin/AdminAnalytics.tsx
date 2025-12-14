import React from 'react';
import { BarChart3, TrendingUp, Users, DollarSign, BookOpen, Clock } from 'lucide-react';

/**
 * Admin Analytics Page
 * Placeholder UI - Platform-wide analytics and insights
 */
export const AdminAnalytics: React.FC = () => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Platform Analytics</h2>
                <p className="text-zinc-500 dark:text-zinc-400">Overview of platform performance and metrics</p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { icon: Users, label: 'Total Users', value: '12,543', change: '+12%', color: 'blue' },
                    { icon: BookOpen, label: 'Total Courses', value: '45', change: '+5', color: 'purple' },
                    { icon: DollarSign, label: 'Revenue (MTD)', value: '₹4.2L', change: '+18%', color: 'green' },
                    { icon: Clock, label: 'Watch Hours', value: '8,432', change: '+24%', color: 'orange' },
                ].map((metric) => (
                    <div key={metric.label} className="bg-white dark:bg-zinc-800 p-5 rounded-xl border border-zinc-200 dark:border-zinc-700">
                        <div className="flex items-center justify-between">
                            <div className={`p-2 rounded-lg bg-${metric.color}-100 dark:bg-${metric.color}-900/30`}>
                                <metric.icon size={20} className={`text-${metric.color}-600 dark:text-${metric.color}-400`} />
                            </div>
                            <span className="text-green-500 text-sm font-medium flex items-center gap-1">
                                <TrendingUp size={14} />
                                {metric.change}
                            </span>
                        </div>
                        <p className="text-2xl font-bold text-zinc-900 dark:text-white mt-3">{metric.value}</p>
                        <p className="text-sm text-zinc-500">{metric.label}</p>
                    </div>
                ))}
            </div>

            {/* Charts Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Chart */}
                <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl border border-zinc-200 dark:border-zinc-700">
                    <h3 className="font-semibold text-zinc-900 dark:text-white mb-4">Revenue Trend</h3>
                    <div className="h-64 flex items-center justify-center bg-zinc-50 dark:bg-zinc-900/50 rounded-lg">
                        <div className="text-center">
                            <BarChart3 size={48} className="text-zinc-300 dark:text-zinc-600 mx-auto mb-2" />
                            <p className="text-sm text-zinc-400">Chart will be rendered here</p>
                        </div>
                    </div>
                </div>

                {/* User Growth Chart */}
                <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl border border-zinc-200 dark:border-zinc-700">
                    <h3 className="font-semibold text-zinc-900 dark:text-white mb-4">User Growth</h3>
                    <div className="h-64 flex items-center justify-center bg-zinc-50 dark:bg-zinc-900/50 rounded-lg">
                        <div className="text-center">
                            <TrendingUp size={48} className="text-zinc-300 dark:text-zinc-600 mx-auto mb-2" />
                            <p className="text-sm text-zinc-400">Chart will be rendered here</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Top Courses Table */}
            <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700">
                <div className="p-4 border-b border-zinc-200 dark:border-zinc-700">
                    <h3 className="font-semibold text-zinc-900 dark:text-white">Top Performing Courses</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-zinc-50 dark:bg-zinc-900/50">
                            <tr>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-zinc-500 uppercase">Course</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-zinc-500 uppercase">Enrollments</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-zinc-500 uppercase">Revenue</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-zinc-500 uppercase">Rating</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                            {[
                                { name: 'Complete Web Development Bootcamp', enrollments: 1234, revenue: '₹61.7L', rating: 4.8 },
                                { name: 'React Mastery Course', enrollments: 856, revenue: '₹25.6L', rating: 4.9 },
                                { name: 'JavaScript Fundamentals', enrollments: 654, revenue: '₹13.0L', rating: 4.7 },
                            ].map((course, i) => (
                                <tr key={i} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/30">
                                    <td className="px-6 py-4 font-medium text-zinc-900 dark:text-white">{course.name}</td>
                                    <td className="px-6 py-4 text-zinc-500">{course.enrollments}</td>
                                    <td className="px-6 py-4 text-zinc-500">{course.revenue}</td>
                                    <td className="px-6 py-4">
                                        <span className="text-yellow-500">★</span> {course.rating}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Placeholder Notice */}
            <div className="text-center py-4">
                <p className="text-sm text-zinc-400">
                    📌 This is a placeholder UI. Integrate with analytics APIs for real data.
                </p>
            </div>
        </div>
    );
};
