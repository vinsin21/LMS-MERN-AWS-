import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Search, Filter, MoreVertical, Shield, UserCheck, UserX, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import api from '../../../lib/api';
import type { ApiResponse } from '../../../types/auth';

// Types for API response
interface User {
    _id: string;
    fullName: string;
    email: string;
    username: string;
    role: 'user' | 'instructor' | 'admin';
    isActive: boolean;
    isEmailVerified: boolean;
    avatar: string | null;
    createdAt: string;
}

interface UsersResponse {
    users: User[];
    totalPages: number;
    currentPage: number;
    totalUsers: number;
    limit: number;
}

/**
 * User Management Page (Admin Only)
 * Connected to /api/v1/users/admin/users API
 */
export const UserManagement: React.FC = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);
    const [limit] = useState(10);

    // Filters
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<string>('');

    // Debounce search input (300ms delay)
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
            setCurrentPage(1); // Reset to page 1 when searching
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Fetch users from API
    const fetchUsers = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams({
                page: currentPage.toString(),
                limit: limit.toString(),
            });

            if (debouncedSearch) params.append('search', debouncedSearch);
            if (roleFilter) params.append('role', roleFilter);
            if (statusFilter) params.append('isActive', statusFilter);

            const response = await api.get<ApiResponse<UsersResponse>>(
                `/users/admin/users?${params.toString()}`
            );

            const data = response.data.data;
            setUsers(data.users);
            setTotalPages(data.totalPages);
            setTotalUsers(data.totalUsers);
        } catch (err: any) {
            console.error('Failed to fetch users:', err);
            setError(err.response?.data?.message || 'Failed to fetch users');
        } finally {
            setIsLoading(false);
        }
    }, [currentPage, limit, debouncedSearch, roleFilter, statusFilter]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    // Stats calculations (from current results)
    const activeUsers = users.filter(u => u.isActive).length;
    const instructors = users.filter(u => u.role === 'instructor').length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">User Management</h2>
                    <p className="text-zinc-500 dark:text-zinc-400">Manage all platform users</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-yellow/50 text-zinc-900 dark:text-white"
                        />
                    </div>

                    {/* Role Filter */}
                    <select
                        value={roleFilter}
                        onChange={(e) => { setRoleFilter(e.target.value); setCurrentPage(1); }}
                        className="px-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-yellow/50 text-zinc-900 dark:text-white"
                    >
                        <option value="">All Roles</option>
                        <option value="user">User</option>
                        <option value="instructor">Instructor</option>
                        <option value="admin">Admin</option>
                    </select>

                    {/* Status Filter */}
                    <select
                        value={statusFilter}
                        onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                        className="px-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-yellow/50 text-zinc-900 dark:text-white"
                    >
                        <option value="">All Status</option>
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                    </select>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-zinc-800 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                            <Users size={20} className="text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-zinc-900 dark:text-white">{totalUsers}</p>
                            <p className="text-sm text-zinc-500">Total Users</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-zinc-800 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                            <UserCheck size={20} className="text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-zinc-900 dark:text-white">{activeUsers}</p>
                            <p className="text-sm text-zinc-500">Active (this page)</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-zinc-800 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                            <Shield size={20} className="text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-zinc-900 dark:text-white">{instructors}</p>
                            <p className="text-sm text-zinc-500">Instructors (this page)</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Error State */}
            {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 text-red-600 dark:text-red-400">
                    {error}
                    <button
                        onClick={fetchUsers}
                        className="ml-2 underline hover:no-underline"
                    >
                        Retry
                    </button>
                </div>
            )}

            {/* Loading State */}
            {isLoading && (
                <div className="flex items-center justify-center py-12">
                    <Loader2 size={32} className="text-brand-yellow animate-spin" />
                </div>
            )}

            {/* Users Table */}
            {!isLoading && !error && (
                <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-zinc-50 dark:bg-zinc-900/50">
                                <tr>
                                    <th className="text-left px-6 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">User</th>
                                    <th className="text-left px-6 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Role</th>
                                    <th className="text-left px-6 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Status</th>
                                    <th className="text-left px-6 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Joined</th>
                                    <th className="text-right px-6 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                                {users.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-zinc-500">
                                            No users found
                                        </td>
                                    </tr>
                                ) : (
                                    users.map((user) => (
                                        <tr
                                            key={user._id}
                                            onClick={() => navigate(`/dashboard/admin/users/${user._id}`)}
                                            className="hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors cursor-pointer"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    {user.avatar ? (
                                                        <img
                                                            src={`${import.meta.env.VITE_CLOUDFRONT_URL}/${user.avatar}`}
                                                            alt={user.fullName}
                                                            className="w-10 h-10 rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-10 h-10 rounded-full bg-brand-yellow/20 flex items-center justify-center">
                                                            <span className="text-brand-yellow font-semibold">
                                                                {user.fullName.charAt(0).toUpperCase()}
                                                            </span>
                                                        </div>
                                                    )}
                                                    <div>
                                                        <p className="font-medium text-zinc-900 dark:text-white">{user.fullName}</p>
                                                        <p className="text-sm text-zinc-500">{user.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${user.role === 'admin'
                                                    ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                                                    : user.role === 'instructor'
                                                        ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                                                        : 'bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300'
                                                    }`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${user.isActive
                                                    ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                                                    : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                                                    }`}>
                                                    {user.isActive ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-zinc-500">
                                                {new Date(user.createdAt).toLocaleDateString('en-IN', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded transition-colors">
                                                    <MoreVertical size={18} className="text-zinc-500" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-200 dark:border-zinc-700">
                            <p className="text-sm text-zinc-500">
                                Page {currentPage} of {totalPages} ({totalUsers} total users)
                            </p>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
                                >
                                    <ChevronLeft size={16} className="text-zinc-500" />
                                </button>
                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
                                >
                                    <ChevronRight size={16} className="text-zinc-500" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
