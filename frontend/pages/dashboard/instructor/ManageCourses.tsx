import React from 'react';
import { GraduationCap, Plus, Search, MoreVertical, Eye, Edit, Users, PlayCircle } from 'lucide-react';

/**
 * Instructor Manage Courses Page
 * Placeholder UI - Manage courses created by the instructor
 */
export const ManageCourses: React.FC = () => {
    // Placeholder data
    const mockCourses = [
        { id: 1, title: 'Complete Web Development Bootcamp', students: 1234, lessons: 120, status: 'published', revenue: '₹61.7L' },
        { id: 2, title: 'React Mastery Course', students: 856, lessons: 45, status: 'published', revenue: '₹25.6L' },
        { id: 3, title: 'Advanced Node.js Patterns', students: 0, lessons: 12, status: 'draft', revenue: '₹0' },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Manage Courses</h2>
                    <p className="text-zinc-500 dark:text-zinc-400">Create and manage your courses</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search your courses..."
                            className="pl-10 pr-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-yellow/50"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-brand-yellow text-black font-medium rounded-lg hover:bg-brand-yellow/90 transition-colors">
                        <Plus size={18} />
                        New Course
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                {[
                    { label: 'Total Courses', value: '3' },
                    { label: 'Total Students', value: '2,090' },
                    { label: 'Total Lessons', value: '177' },
                    { label: 'Total Revenue', value: '₹87.3L' },
                ].map((stat) => (
                    <div key={stat.label} className="bg-white dark:bg-zinc-800 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700">
                        <p className="text-2xl font-bold text-zinc-900 dark:text-white">{stat.value}</p>
                        <p className="text-sm text-zinc-500">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Courses List */}
            <div className="space-y-4">
                {mockCourses.map((course) => (
                    <div key={course.id} className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-5 hover:border-brand-yellow/50 transition-colors">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                            {/* Thumbnail */}
                            <div className="w-full md:w-40 aspect-video bg-zinc-100 dark:bg-zinc-900 rounded-lg flex items-center justify-center flex-shrink-0">
                                <GraduationCap size={32} className="text-zinc-300 dark:text-zinc-600" />
                            </div>

                            {/* Info */}
                            <div className="flex-1">
                                <div className="flex items-start justify-between gap-2">
                                    <h3 className="font-semibold text-zinc-900 dark:text-white">{course.title}</h3>
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full flex-shrink-0 ${course.status === 'published'
                                            ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                                            : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                                        }`}>
                                        {course.status}
                                    </span>
                                </div>

                                <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-zinc-500">
                                    <span className="flex items-center gap-1">
                                        <Users size={14} /> {course.students} students
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <PlayCircle size={14} /> {course.lessons} lessons
                                    </span>
                                    <span className="font-medium text-zinc-900 dark:text-white">
                                        {course.revenue}
                                    </span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2">
                                <button className="flex items-center gap-1 px-3 py-2 text-sm text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg transition-colors">
                                    <Eye size={16} /> Preview
                                </button>
                                <button className="flex items-center gap-1 px-3 py-2 text-sm text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg transition-colors">
                                    <Edit size={16} /> Edit
                                </button>
                                <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg transition-colors">
                                    <MoreVertical size={16} className="text-zinc-500" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Placeholder Notice */}
            <div className="text-center py-4">
                <p className="text-sm text-zinc-400">
                    📌 This is a placeholder UI. Create instructor course management APIs to enable functionality.
                </p>
            </div>
        </div>
    );
};
