import React, { useState } from 'react';
import { FolderKanban, Search, Plus, MoreVertical, Eye, Edit, Trash2, LayoutGrid, List, Users } from 'lucide-react';

/**
 * Course Management Page (Admin Only)
 * Placeholder UI - Manage all platform courses
 */
export const CourseManagement: React.FC = () => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    // Placeholder data
    const mockCourses = [
        { id: 1, title: 'Complete Web Development Bootcamp', instructor: 'John Doe', students: 1234, status: 'published', price: 4999 },
        { id: 2, title: 'React Mastery Course', instructor: 'Jane Smith', students: 856, status: 'published', price: 2999 },
        { id: 3, title: 'Node.js Backend Development', instructor: 'Bob Johnson', students: 0, status: 'draft', price: 3999 },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Course Management</h2>
                    <p className="text-zinc-500 dark:text-zinc-400">Manage all platform courses</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search courses..."
                            className="pl-10 pr-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-yellow/50 text-zinc-900 dark:text-white"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-brand-yellow text-black font-medium rounded-lg hover:bg-brand-yellow/90 transition-colors">
                        <Plus size={18} />
                        Add Course
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                {[
                    { label: 'Total Courses', value: '45', color: 'blue' },
                    { label: 'Published', value: '38', color: 'green' },
                    { label: 'Draft', value: '7', color: 'yellow' },
                    { label: 'Total Revenue', value: '₹12.5L', color: 'purple' },
                ].map((stat) => (
                    <div key={stat.label} className="bg-white dark:bg-zinc-800 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700">
                        <p className="text-2xl font-bold text-zinc-900 dark:text-white">{stat.value}</p>
                        <p className="text-sm text-zinc-500">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* View Toggle */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-zinc-500">{mockCourses.length} courses</p>
                <div className="flex items-center gap-1 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-md transition-colors ${viewMode === 'grid'
                                ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm'
                                : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                            }`}
                        title="Grid view"
                    >
                        <LayoutGrid size={18} />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-md transition-colors ${viewMode === 'list'
                                ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm'
                                : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                            }`}
                        title="List view"
                    >
                        <List size={18} />
                    </button>
                </div>
            </div>

            {/* Grid View */}
            {viewMode === 'grid' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockCourses.map((course) => (
                        <div key={course.id} className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden group">
                            {/* Thumbnail Placeholder */}
                            <div className="aspect-video bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
                                <FolderKanban size={40} className="text-zinc-300 dark:text-zinc-600" />
                            </div>

                            <div className="p-4">
                                <div className="flex items-start justify-between gap-2">
                                    <h3 className="font-semibold text-zinc-900 dark:text-white line-clamp-2">{course.title}</h3>
                                    <button className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded opacity-0 group-hover:opacity-100 transition-all">
                                        <MoreVertical size={16} className="text-zinc-500" />
                                    </button>
                                </div>

                                <p className="text-sm text-zinc-500 mt-1">by {course.instructor}</p>

                                <div className="flex items-center justify-between mt-4">
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${course.status === 'published'
                                        ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                                        : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                                        }`}>
                                        {course.status}
                                    </span>
                                    <span className="font-semibold text-zinc-900 dark:text-white">₹{course.price}</span>
                                </div>

                                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-700">
                                    <button className="flex-1 flex items-center justify-center gap-1 py-2 text-sm text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg transition-colors">
                                        <Eye size={16} /> View
                                    </button>
                                    <button className="flex-1 flex items-center justify-center gap-1 py-2 text-sm text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg transition-colors">
                                        <Edit size={16} /> Edit
                                    </button>
                                    <button className="flex-1 flex items-center justify-center gap-1 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                                        <Trash2 size={16} /> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* List View */}
            {viewMode === 'list' && (
                <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-zinc-50 dark:bg-zinc-900/50">
                            <tr>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Course</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Instructor</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Students</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Status</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Price</th>
                                <th className="text-right px-6 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                            {mockCourses.map((course) => (
                                <tr key={course.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-8 bg-zinc-100 dark:bg-zinc-900 rounded flex items-center justify-center flex-shrink-0">
                                                <FolderKanban size={16} className="text-zinc-400" />
                                            </div>
                                            <span className="font-medium text-zinc-900 dark:text-white line-clamp-1">{course.title}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-zinc-500">{course.instructor}</td>
                                    <td className="px-6 py-4">
                                        <span className="flex items-center gap-1 text-sm text-zinc-500">
                                            <Users size={14} />
                                            {course.students.toLocaleString()}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${course.status === 'published'
                                                ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                                                : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                                            }`}>
                                            {course.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-zinc-900 dark:text-white">₹{course.price}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-1">
                                            <button className="p-2 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg transition-colors" title="View">
                                                <Eye size={16} />
                                            </button>
                                            <button className="p-2 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg transition-colors" title="Edit">
                                                <Edit size={16} />
                                            </button>
                                            <button className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" title="Delete">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Placeholder Notice */}
            <div className="text-center py-4">
                <p className="text-sm text-zinc-400">
                    📌 This is a placeholder UI. Create course management APIs to enable functionality.
                </p>
            </div>
        </div>
    );
};
